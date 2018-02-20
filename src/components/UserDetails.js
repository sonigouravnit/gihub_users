/**
 * Created by gouravsoni on 20/02/18.
 */

import React, {Component} from 'react';
import '../css/userDetails.css';
import restUtil, {urlsConfig} from '../restUtil'

class UserDetails extends Component {
    constructor() {
        super();
        this.eachEntry = function (data, index) {
            let formatData = function (data) {
                if (data) {
                    return data.toString();
                }
                return null;
            };
            return (
                <div className="keyRow" key={index}>
                    <span className="keyColumn">{data[0]}</span>
                    <span className="keyColumn">{formatData(data[1])}</span>
                </div>
            );
        };
        this.state = {
            userDetail: {},
            repos: []
        }

    }


    componentWillMount() {

        let restConfig = {
            method: urlsConfig.USER.method,
            url: urlsConfig.USER.url.replace(":userId", this.props.match.params.user),
        };
        restUtil(restConfig).then(success => {
            this.setState({
                userDetail: success.data
            });

            this.getRepos(this.state.userDetail.repos_url)


        }).catch(error => {
            window.alert(error);
        });

    }

    getRepos = function (url) {
        let restConfig = {
            method: urlsConfig.USER.method,
            url: url
        };
        restUtil(restConfig).then(success => {
            this.setState({
                repos: success.data
            });


        }).catch(error => {
            window.alert(error);
        });
    };

    render() {
        return (
            <div className="UserDetail">
                <div className="profile">
                    <figure >
                        <img src={this.state.userDetail.avatar_url} alt={this.state.userDetail.login}
                             className="userImage"/>
                        <figcaption><b>{this.state.userDetail.name}</b></figcaption>
                    </figure>
                </div>


                <UserRepoDetails repos={this.state.repos}/>

                <div>
                    { Object.entries(this.state.userDetail).map(this.eachEntry)}
                </div>

            </div>
        );
    }
}

class UserRepoDetails extends Component {


    constructor() {
        super();

        this.eachRepo = function (item, index) {
            return (
                <div className="repoRow" key={index}>
                    <a target="_blank" rel="noopener noreferrer" href={item.html_url}>{item.name}</a>
                </div>
            );
        };
    }


    render() {
        return (
            <div>

                <div className="repoHeader"><b> Repositories : {this.props.repos.length}</b></div>

                <div className="repoContent">

                    {this.props.repos.map(this.eachRepo)}
                </div>
            </div>

        );
    }
}


export default UserDetails;
