const Hapi = require("hapi");
const mocker = require("mocker-data-generator").default;
const faker = require("faker");

const random = () => {
  return Math.floor(Math.random() * 50 + 1);
};

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
  });

  server.route({
    method: "GET",
    path: "/api/v1/packages",
    handler: async (request, h) => {
      const vote = {
        username: { faker: "internet.userName" },
        repo: { faker: "internet.url" },
      };

      votes = await mocker()
        .schema("votes", vote, 50)
        .build();

      makeVotes = () => ({
        function() {
          return this.faker.random.arrayElement(votes.votes);
        },
        length: random(),
      });

      const makeTags = () => ({
        function() {
          return this.faker.company.catchPhraseNoun();
        },
        length: random(),
      });

      const package = {
        id: { incrementalId: 0 },
        name: { faker: "commerce.productName" },
        description: { faker: "lorem.sentence" },
        image: { faker: "image.image" },
        website: { faker: "internet.url" },
        repository: { faker: "internet.url" },
        license: { faker: "commerce.productAdjective" },
        upvotes: [makeVotes()],
        downvotes: [makeVotes()],
        tags: [makeTags()],
        added: { faker: "date.past" },
      };

      return mocker()
        .schema("packages", package, 5)
        .build();
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
