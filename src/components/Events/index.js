import React, { Component } from "react";
import { observer } from "mobx-react";
import PropTypes from "prop-types";

export default function Events(Components) {
    return observer(
        class ArticleEvent extends Component {
            static propTypes = {
                history: PropTypes.object,
                location: PropTypes.object,
                Appstore: PropTypes.object
            };
            constructor(props) {
                super(props);
                this.click = this.click.bind(this);
                this.mouseover = this.mouseover.bind(this);
            }
            mouseover(e) {
                e.stopPropagation();
                if (e.target.dataset.hove) {
                    const { offsetLeft, offsetTop } = e.target;
                    const { hove, type, index } = e.target.dataset;
                    const author_id = index
                        ? this.props.Appstore.posts[Number(index)].author_id
                        : null;
                    this.props.Appstore.setState("hove", {
                        article_type: type,
                        hove_type: hove,
                        author_id: author_id,
                        opacity: 1,
                        position: { left: offsetLeft + 15, top: offsetTop + 24 }
                    });
                } else {
                    this.props.Appstore.setState("hove", { opacity: 0 });
                }
            }

            click(e) {
                e.stopPropagation();
                if (e.target.dataset.click) {
                    switch (e.target.dataset.click) {
                        case "read_article":
                            this.read(e);
                            break;

                        case "like":
                            this.like(e);
                            break;

                        case "read_comment":
                            this.read(e);
                            break;

                        case "collect":
                            this.collect(e);
                            break;

                        case "forward":
                            this.forward(e);
                            break;
                    }
                } else {
                    this.default();
                }
            }

            like(e) {
                const index = Number(e.target.dataset.index);
                const { _id, author_id } = this.props.Appstore.posts[index];
                this.props.Appstore.like(index, _id, author_id);
            }

            read(e) {
                const index = Number(e.target.dataset.index);
                const { click } = e.target.dataset;
                if (click === "read_comment") {
                    this.props.Appstore.read_article_comment("comment", index);
                } else if (click === "read_article") {
                    const { offsetTop } = e.target;
                    this.props.Appstore.read_article_comment("article", index, offsetTop);
                } else {
                    this.props.Appstore.setMessage({ text: "read参数错误", is: false });
                }
            }

            collect(e) {
                const { index } = e.target.dataset;
                const { _id, author_id } = this.props.Appstore.posts[Number(index)];
                this.props.Appstore.setState("modal", {
                    open: "collect",
                    posts_id: _id,
                    author_id: author_id
                });
            }

            forward(e) {
                const { index } = e.target.dataset;
                const { offsetLeft, offsetTop } = e.target;
                const { _id } = this.props.Appstore.posts[Number(index)];
                if (this.props.Appstore.modal.open === "forward") {
                    this.props.Appstore.setState("modal", {
                        open: null,
                        position: null
                    });
                } else {
                    this.props.Appstore.setState("modal", {
                        open: "forward",
                        position: { left: offsetLeft - 60 + 30, top: offsetTop + 30 },
                        posts_id: _id
                    });
                }
            }
            default() {
                if (this.props.Appstore.modal.open === "forward") {
                    this.props.Appstore.setState("modal", {
                        open: null,
                        position: null
                    });
                }
            }
            render() {
                return (
                    <div onClick={this.click} onMouseOver={this.mouseover}>
                        <Components {...this.props} />
                    </div>
                );
            }
        }
    );
}
