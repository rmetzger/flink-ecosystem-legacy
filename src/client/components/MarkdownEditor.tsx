import React, { useState, SyntheticEvent, useRef, useEffect } from "react";
import cx from "classnames";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor(props: any) {
  const [tab, setTab] = useState("write");
  const ref = useRef() as any;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    props.onChange(e.target.value);
  };

  const changeTab = (newTab: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    setTab(newTab);
  };

  useEffect(() => {
    if (tab === "write") {
      ref.current.focus();
    }
  }, [tab]);

  return (
    <>
      <ul className="nav nav-tabs">
        <li className="nav-item" onClick={changeTab("write")}>
          <span className={cx("nav-link", { active: tab === "write" })}>
            Write
          </span>
        </li>
        <li className="nav-item" onClick={changeTab("preview")}>
          <span className={cx("nav-link", { active: tab === "preview" })}>
            Preview
          </span>
        </li>
      </ul>
      <div className="pt-2">
        <div hidden={tab === "preview"}>
          <TextareaAutosize
            inputRef={ref}
            className="form-control"
            value={props.content}
            placeholder={props.placeholder}
            onChange={handleChange}
            minRows={4}
          />
        </div>
        <div hidden={tab === "write"}>
          <ReactMarkdown source={props.content} />
        </div>
      </div>
    </>
  );
}
