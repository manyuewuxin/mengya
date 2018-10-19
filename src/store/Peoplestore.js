import { observable, action } from "mobx";
import { app, people } from "../request";
import appstore from "./Appstore";

class Peoplestore {
    @observable people = [];
    @observable author = null;
    @observable count = 0;
    @observable loading = true;
    @observable update = false;
    @observable currentPage = 1;
    @observable visibility = false;
    @observable description = null;

    index = null;
    page = null;
    timeID = 0;
    people_user_id = {};

    @action
    setState(obj) {
        if (Object.prototype.toString.call(obj) === "[object Object]") {
            for (var key in obj) {
                if (key in this) {
                    this[key] = obj[key];
                }
            }
        }
    }

    @action
    getPeople(path, user_id, page) {
        if(typeof path == "string" && typeof user_id == "string" && typeof page == "number"){
            Promise.all([
                people.getPeople(path, user_id, page),
                app.getAuthor(user_id, true),
                app.getUser(),
                app.getMessage(1)
            ]).then(([p, a, u, m]) => {
                if (path === "article") {
                    appstore.setState("app", { posts: p.people });
                    this.setState({
                        count: p.count,
                        author: a.author,
                        currentPage: page,
                        loading: false,
                        update: false
                    });
                } else {
                    this.setState({
                        people: p.people,
                        count: p.count,
                        author: a.author,
                        currentPage: page,
                        loading: false,
                        update: false
                    });
                }
                appstore.setState("app", { user: u.user });
                appstore.setUserMessage(m, 1);
                this.people_user_id = user_id;
            });
        }
        else {
            appstore.setMessage({ text: "getPeople params error", is: false });
        }
    }

    @action.bound
    ok_removeArticle() {
        const { image, _id } = appstore.posts[this.index];
        Promise.resolve().then(() => {
                return image !== null
                    ? app.removeFile({ url: image, folder: "editor" })
                    : true;
            })
            .then(() => {
                return people.removeArticle({ posts_id: _id });
            })
            .then(() => {
                if(appstore.posts.length-1 > 0){
                    appstore.removeArticle(this.index);
                    return Promise.resolve({ people: null });
                }
                else{
                    const page = this.currentPage - 1 > 0 ? this.currentPage - 1 : 1;
                    return this.getPeople("article", this.people_user_id, page);
                }
            }).then(({ people, count })=>{
                if(Array.isArray(people)){
                    appstore.setState("app", { posts: people });
                    this.setState({
                        count: count,
                        visibility: false,
                        description: null
                    });
                }
                else {
                    this.setState({
                        visibility: false,
                        description: null
                    });                    
                }
            });
    }

    @action 
    removeCollect(index){
        if(typeof index === "number" && Number.isNaN(index) === false){
            this.people.splice(index,1);
        }
        else{
            appstore.setMessage({ text: "removeCollect params error", is: false });
        }
    }

    @action.bound
    ok_removeCollect() {
        const { _id, image } = this.people[this.index];

            app.removeFile({ url: image, folder: "collect" })
            .then(() => {
                return people.removeCollect({ collect_id: _id });
            }).then(()=>{
                if(this.people.length-1 > 0){
                    this.removeCollect(this.index);
                    return Promise.resolve({ people: null});
                }
                else{
                    const page = this.currentPage - 1 > 0 ? this.currentPage - 1 : 1;
                    return this.getPeople("collect", this.people_user_id, page);
                }
            }).then(({ people, count })=>{
                if(Array.isArray(people)){
                    this.setState({
                        people: people,
                        count: count,
                        visibility: false,
                        description: null
                    });                    
                }
                this.setState({
                    visibility: false,
                    description: null
                }); 
            });
    }

    @action.bound
    no_remove() {
        this.index = null;
        this.visibility = false;
        this.description = null;
    }

    @action
    remove_article(index, page) {
        if (
            Number.isInteger(index) &&
            Number.isInteger(page) &&
            Number.isNaN(index) === false
        ) {
            this.index = index;
            this.page = page;
            this.description = { title: "你确定要删除该文章吗？" };
            this.visibility = true;
        } else {
            appstore.setMessage({ text: "remove_article params error", is: false });
        }
    }

    @action
    remove_collect(index) {
        if (Number.isInteger(index) && Number.isNaN(index) === false) {
            this.index = index;
            this.description = { title: "你确定要删除该收藏夹吗？" };
            this.visibility = true;
        } else {
            appstore.setMessage({ text: "remove_collect params error", is: false });
        }
    }

    @action
    follow(index) {
        if (Number.isInteger(index) && Number.isNaN(index) === false) {
            const user_id = this.people[index].author[0]._id;
            appstore.follow(user_id);
        } else {
            appstore.setMessage({ text: "follow params error", is: false });
        }
    }
}

export default new Peoplestore();
