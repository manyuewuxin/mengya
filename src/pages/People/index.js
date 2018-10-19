import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";

import Header from "./Header";
import Links from "./Links";
import Sidebar from "./Sidebar";
import Router from "./Router";
import Page from "@components/Page";
import utils from "@utils";

@inject("Appstore", "Peoplestore")
@observer
export default class People extends Component {
    static propTypes = {
        Appstore: PropTypes.object,
        Peoplestore: PropTypes.object,
        location: PropTypes.object,
        match: PropTypes.object,
        history: PropTypes.object
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        const newlocation = nextProps.location;
        const location = this.props.location;
        if (
            location.pathname !== newlocation.pathname ||
            location.search !== newlocation.search
        ) {
            this.props.Peoplestore.setState({ update: true });
        }
    }

    render() {
        const { match, location, history, Appstore, Peoplestore } = this.props;
        if (Peoplestore.loading) return <div />;
        return (
            <div className="people">
                <div className="people_left">
                    <Header history={history} match={match} author={Peoplestore.author} />
                    <div className="people_content">
                        <Links location={location} match={match} />
                        {Peoplestore.update ? null : <Router />}
                    </div>
                    <Page
                        count={Peoplestore.count}
                        setPage={`${location.pathname}?`}
                        currentPage={Peoplestore.currentPage}
                        currentStyle="posts_ispage"
                        ulStyle="page"
                    />
                </div>
                <Sidebar
                    author={Peoplestore.author}
                    is_myhome={Appstore.id === match.params.id}
                />
            </div>
        );
    }
    componentDidMount() {
        const { match, Peoplestore } = this.props;
        const { path, id } = match.params;
        Peoplestore.getPeople(path, id, 1);
    }
    componentDidUpdate() {
        if (this.props.Peoplestore.update) {
            const { location, match, Peoplestore } = this.props;

            const { path, id } = match.params;

            const search = utils.search(location.search.split("?")[1]);

            Peoplestore.getPeople(path, id, Number(search.page || 1));
        }
    }
    componentWillUnmount() {
        this.props.Peoplestore.setState({ loading: true, update: false });
    }
}
