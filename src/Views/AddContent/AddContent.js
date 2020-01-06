import React from "react";
import "./_addContent.scss";

import ReactQuill from "react-quill";
import { Input, Button, DatePicker, Form, notification } from "antd";
import moment from "moment";
import { uploadFile, addContents } from "../../api/apiCalls";

export default function AddContent(props) {
  const [fileChange, setFileChange] = React.useState(null);
  const [fileUploaded, setFileUploaded] = React.useState({});
  const [fileUploadLoading, setFileUploadLoading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [state, setState] = React.useState({
    title: "",
    type: props.match.params.category,
    date: "2019-04-25",
    body: ""
  });
  const fileRef = React.createRef();

  const addFile = () => {
    const data = new FormData();
    data.append("file", fileChange);
    data.append("file_for", "content");
    data.append("file_type", "image");
    setFileUploadLoading(true);
    uploadFile(data)
      .then(res => {
        setFileUploaded({ id: res.id, url: res.url });
        setFileUploadLoading(false);
        console.log(res);
      })
      .catch(err => {
        console.log(err);
        setFileUploadLoading(false);
      });
  };

  React.useEffect(() => {
    if (fileChange !== null) {
      addFile();
    }
    //eslint-disable-next-line
  }, [fileChange]);

  const addEvent = () => {
    if (fileUploaded.id) {
      const payload = { ...state, cover_image: fileUploaded.id };
      setLoading(true);
      addContents(payload)
        .then(res => {
          setLoading(false);
        })
        .catch(err => {
          if (err.body) {
            notification.error({
              message: err.body
            });
          }
          if (err.title) {
            notification.error({
              message: err.title
            });
          }
          setLoading(false);
        });
    } else {
      notification.error({
        message: "Cover photo is required"
      });
    }
  };

  return (
    <div className="dashboard-content-body">
      <br />
      <div className="add-event">
        <header>
          <h1>Add {props.match.params.category}</h1>
        </header>
        <div className="flex ci events-control">
          <div className="event-content-left">
            <img className="card" src={fileUploaded.url} alt="" />
            <input
              type="file"
              onChange={e => {
                setFileChange(e.target.files[0]);
              }}
              ref={fileRef}
              style={{ display: "none" }}
            />
          </div>
          <div className="event-content-right">
            <Form.Item label={props.match.params.category + " Title"}>
              <Input
                placeholder="Title"
                defaultValue={state.title}
                onChange={e => {
                  setState({ ...state, title: e.target.value });
                }}
              />
            </Form.Item>
            <Form.Item label="Date (if necessary)">
              <DatePicker
                style={{ width: "100%" }}
                onChange={value => {
                  if (value) {
                    setState({
                      ...state,
                      date: value.format("YYYY-MM-DD")
                    });
                  }
                }}
                defaultValue={moment((state.date, "1999-09-09"), "YYYY-MM-DD")}
              />
            </Form.Item>
            <div className="gap"></div>
            <Button
              type="primary"
              loading={fileUploadLoading}
              onClick={() => {
                fileRef.current.click();
              }}
            >
              Change Cover Photo
            </Button>
            <div className="hgap"></div>
            <Button
              type="primary"
              loading={loading}
              onClick={() => {
                addEvent();
              }}
            >
              Submit Content
            </Button>
          </div>
        </div>

        <div className="add-event-editor">
          <ReactQuill
            theme="snow"
            onChange={value => {
              setState({ ...state, body: value });
            }}
            modules={modules}
            formats={formats}
            bounds={".add-event-editor"}
          />
        </div>
      </div>
    </div>
  );
}

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ color: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ align: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "video"],
    ["clean"]
  ],
  clipboard: {
    matchVisual: false
  }
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "color",
  "code-block",
  "script"
];
