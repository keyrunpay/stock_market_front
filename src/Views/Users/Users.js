import React from "react";
import "./_content.scss";
import { Button } from "antd";
import Loading from "../../Components/Loading";
import { getUsers } from "../../api/apiCalls";
import AddUserModal from "./AddUserModal";

export default function Users() {
  const [state, setState] = React.useState({
    loading: true,
    data: [],
    error: false
  });

  const [showAddUser, setShowAddUser] = React.useState(false);

  const fetchUsers = () => {
    setState({ ...state, loading: true, error: false, data: [] });
    getUsers()
      .then(res => {
        setState({ ...state, loading: false, error: false, data: res });
      })
      .catch(err => {
        setState({
          ...state,
          loading: false,
          error: err.message,
          data: []
        });
      });
  };

  React.useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
  }, [true]);

  return (
    <section id="contents">
      <AddUserModal
        visible={showAddUser}
        onCancelPressed={() => {
          setShowAddUser(false);
        }}
        refresh={() => {
          fetchUsers();
        }}
      />
      <br />
      <div className="flex jcsb">
        <h1 className="title"> Users </h1>
        <Button
          onClick={() => {
            setShowAddUser(true);
          }}
          type="primary"
          icon="plus"
        >
          Add Users
        </Button>
      </div>
      <br />
      {state.loading && <Loading />}
      {state.error && <p style={{ color: "red" }}>{state.error}</p>}
      {state.data && state.data.length > 0 && (
        <React.Fragment>
          <div className="contents-table">
            <table cellPadding="0" cellSpacing="0">
              <ContentTableHead />
              <tbody>
                {state.data.map(item => {
                  return <ContentTableItems key={item.id} {...item} />;
                })}
              </tbody>
            </table>
          </div>
        </React.Fragment>
      )}
    </section>
  );
}

const ContentTableHead = () => {
  return (
    <thead>
      <tr>
        <th style={{ maxWidth: "40px" }}>ID</th>
        <th>Name</th>
        <th>Username</th>
        <th>Phone</th>
        <th>Gender</th>
        <th style={{ maxWidth: "200px" }}>Created At</th>
        <th style={{ maxWidth: "200px" }}>Actions</th>
      </tr>
    </thead>
  );
};

const ContentTableItems = props => {
  return (
    <tr>
      <td>{props.id}</td>
      <td>
        <div>{props.name}</div>
      </td>
      <td>{props.username}</td>
      <td>{props.phone}</td>
      <td>{props.gender}</td>
      <td>{props.created_at}</td>
      <td className="actions">
        <Button shape="circle" icon="edit" size="small" type="primary" />
        <div className="hgap"></div>
        <Button shape="circle" icon="close" size="small" type="danger" />
      </td>
    </tr>
  );
};
