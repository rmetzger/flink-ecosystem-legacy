import checkGithub from "../../../../middleware/checkGithub";

export const get = [
  checkGithub({ required: false }),
  async ctx => {
    try {
      const pkg = await ctx
        .knex("package")
        .select(
          "package.slug",
          "package.name",
          "user.login as owner",
          "package.description",
          "package.readme",
          "package.image",
          "package.website",
          "package.repository",
          "package.added",
          "package.updated",
          "package.license",
          "package.category",
          ctx.knex.raw("ifnull(vote.vote, 0) as vote"),
          ctx.knex.raw("count(distinct upvote.id) as upvotes"),
          ctx.knex.raw("count(distinct downvote.id) as downvotes")
        )
        .where({ slug: ctx.params.package })
        .leftJoin("user", "package.user_id", "user.id")
        .leftJoin("vote", join => {
          join
            .on("package.id", "vote.package_id")
            .on("vote.user_id", ctx.state.user.id);
        })
        .leftJoin("vote as upvote", join => {
          join.on("package.id", "upvote.package_id").on("upvote.vote", 1);
        })
        .leftJoin("vote as downvote", join => {
          join.on("package.id", "downvote.package_id").on("downvote.vote", -1);
        })

        .first();

      const comments = await ctx
        .knex("package")
        .select(
          "comment.added",
          "comment.text",
          "comment.id",
          "user.id as user_id",
          "user.avatar_url",
          "user.login"
        )
        .where({ slug: ctx.params.package })
        .join("comment", "comment.package_id", "package.id")
        .leftJoin("user", "comment.user_id", "user.id");

      ctx.body = {
        package: pkg,
        comments,
      };
    } catch (err) {
      ctx.throw(500, err);
    }
  },
];
