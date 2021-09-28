import React from 'react'

const UserItems = (props) => {


    const { login, avatar_url, html_url } = props.user;

    return (
        <div className="card text-center">
            <img src={avatar_url} alt="" className="round-img" style={{ width: "60px" }} />
            <h3>{login}</h3>

            <div>
                <a href={html_url} className="btn btn-dark my-1">Click</a>
            </div>

        </div>

    );
}

export default UserItems
