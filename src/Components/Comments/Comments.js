import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setComments } from "../../Ducks/commentsReducer";
import "./Comments.css";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      current_user_id: this.props.profile.user.user_id,
      edit_message: false,
      add_message: false
    };
    // this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount = () => {
    const { event_id } = this.props;
    axios.get(`/api/get_comments/${event_id}`).then(res => {
      this.props.setComments(res.data);
    });
  };

  deleteComment = comment_id => {
    const { event_id } = this.props;
    const num = Number(event_id);
    axios
      .delete(`/api/delete_comment/${comment_id}?event_id=${num}`)
      .then(res => {
        this.props.setComments(res.data);
      });
  };

  editComment = (comment_id, event_id) => {
    const { message } = this.state;
    axios
      .put(`/api/edit_comment/${comment_id}`, { message, event_id })
      .then(res => {
        // console.log("got response", res.data);
        this.props.setComments(res.data);
      });
  };

  createComment = () => {
    const { message } = this.state;
    const { user_id } = this.props.profile.user;
    const { event_id } = this.props;
    axios.post(`/api/add_comment`, { message, user_id, event_id }).then(res => {
      this.props.setComments(res.data);
      console.log("hit", res.data);
    });
  };

  editAndDeleteButtons = (num1, num2, num3, num4) => {
    if (num1 === num2) {
      return (
        <div className="editDeleteContainer">
          <button
            className="editButton"
            onClick={() => {
              this.setState({
                edit_message: !this.state.edit_message
              });
            }}
          >
            Edit
          </button>
          {this.state.edit_message ? (
            <div className="editCommentAndButton">
              <textarea
                className="editCommentText"
                onChange={event => {
                  this.setState({
                    message: event.target.value
                  });
                }}
                placeholder="New Message Here"
              />
              <button
                className="submitEdit"
                onClick={() => this.editComment(num3, num4)}
              >
                Submit Edit
              </button>
            </div>
          ) : null}
          <button
            className="deleteButton"
            onClick={() => this.deleteComment(num3)}
          >
            Delete
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    const mappedComments = this.props.comments.comments.map(element => {
      console.log(element, "mapped element");
      return (
        <div className="commentMappedContainer">
          <div>
            <h1 className="commentName">{element.first_name}</h1>
          </div>
          <div>
            <p className="commentContent">{element.message}</p>
          </div>
          {this.editAndDeleteButtons(
            this.state.current_user_id,
            element.user_id,
            element.comment_id,
            element.event_id
          )}
        </div>
      );
    });
    return (
      <div>
        <div className="CreateCommentContainer">
          <button
            onClick={() => {
              this.setState({
                add_message: !this.state.add_message
              });
            }}
          >
            Create Message
          </button>
        </div>
        {!this.state.add_message ? null : (
          <div>
            <textarea
              className="newCommentText"
              onChange={event =>
                this.setState({
                  message: event.target.value
                })
              }
              placeholder="type message here"
            />
            <button
              className="CreateCommentSubmit"
              onClick={this.createComment}
            >
              Submit
            </button>
          </div>
        )}
        <div className="commentContainer">
          <span className="commentContainer">{mappedComments}</span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  setComments
};

const invokedConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);
export default invokedConnect(Comments);
