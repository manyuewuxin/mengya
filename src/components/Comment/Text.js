import React from "react";
import PropTypes from "prop-types";

const CommentText = ({ text }) => {
    return <div className="comment_text">{text}</div>;
};

CommentText.propTypes = {
    text: PropTypes.string
};

export default CommentText;
