import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setComments } from "../../Ducks/commentsReducer";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      current_user_id: this.props.profile.user.user_id,
      edit_message: false,
      add_message: false
    };
  }

  componentDidMount() {
    const { event_id } = this.props;
    axios.get(`/api/get_comments/${event_id}`).then(res => {
      this.props.setComments(res.data);
    });
  }

  deleteComment = (comment_id, event_id) => {
    console.log(comment_id, event_id);
    axios
      .delete(`/api/delete_comment/${comment_id}`, { event_id })
      .then(res => {
        this.props.setComments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // editComment = ()

  createComment = () => {
    const { message } = this.state;
    const { user_id } = this.props.profile.user;
    const { event_id } = this.props;
    axios.post(`/api/add_comment`, { message, user_id, event_id }).then(res => {
      this.props.setComments(res.data);
    });
  };

  editAndDeleteButtons = (num1, num2, num3, num4) => {
    if (num1 === num2) {
      return (
        <div>
          <button
            onClick={() => {
              this.setState({
                edit_message: !this.state.edit_message
              });
            }}
          >
            Edit
          </button>
          {this.state.edit_message ? (
            <div>
              <input placeholder="New Message Here" />
              <button>Submit Edit</button>
            </div>
          ) : null}
          <button onClick={() => this.deleteComment(num3, num4)}>Delete</button>
        </div>
      );
    } else {
      return null;
    }
  };

  render() {
    console.log(this.props.comments.comments);
    console.log(this.props);
    const mappedComments = this.props.comments.comments.map(element => {
      return (
        <div>
          <div>
            <h1>{element.first_name}</h1>
          </div>
          <div>
            <p>{element.message}</p>
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
        <div>
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
            <input
              onChange={event =>
                this.setState({
                  message: event.target.value
                })
              }
              placeholder="type message here"
            />
            <button onClick={this.createComment}>Submit</button>
          </div>
        )}
        <div>
          <span>{mappedComments}</span>
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
