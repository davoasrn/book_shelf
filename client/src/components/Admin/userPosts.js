import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions';
import moment from 'moment-js';
import { Link } from 'react-router-dom';

class UserPosts extends Component {

    componentWillMount(){
        this.props.dispatch(getUserPosts(this.props.user.login.id))
    }

    showUserPosts = (books) => (
        books.userPosts ? 
            books.userPosts.map(item => (
                <tr key={item._id}>
                    <td>
                        <Link to={
                            `/user/edit-post/${item._id}`
                        }>{item.name}</Link>
                    </td>
                    <td>{item.author}</td>
                    <td>{moment(item.createdAt).format("MM/DD/YY")}</td>
                </tr>
            ))    
        : null
    )

    render() {
        let books = this.props.books;
        return (
            <div className="user_posts">
                <h4>Your Reviews</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showUserPosts(books)}
                    </tbody>
                </table>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        books: state.books
    }
}
export default connect(mapStateToProps)(UserPosts);
