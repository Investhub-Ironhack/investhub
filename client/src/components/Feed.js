import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Feed extends Component {
  state = {
    articles: [],
    search: "",
  };

  componentDidMount() {
    axios
      .get(`/api/articles/findarticles`)
      .then((response) => {
        console.log(response);
        this.setState({ articles: response.data });
      })
      .catch((err) => {
        console.log(err, `errors are our friends`);
        return err.response.message;
      });
  }

  handleFilter = (event) => {
    console.log(event.target.value);
    this.setState({
      search: event.target.value,
    });
  };

  render() {
    return (
      <>
        <h1 className="feed-title">Your daily articles and analysis</h1>
        <form>
          <select
            className="input-text"
            name="category"
            onChange={this.handleFilter}
            id="category"
          >
            <option value="">all</option>
            <option value="analysis">Analysis</option>
            <option value="stocks">Stocks</option>
            <option value="options">Options</option>
            <option value="comodities">Comodities</option>
            <option value="opinion">Opinion</option>
            <option value="Due-Diligence">Due Diligence</option>
          </select>
          {/* <button type="submit" onClick={this.handleChange}>
            Search
          </button> */}
        </form>
        <table className="table">
          <tbody>
            {this.state.articles
              .filter((article) => article.category.includes(this.state.search))
              .map((article) => {
                console.log(article);
                return (
                  <tr className="table-row">
                    <td>
                      <Link
                        className="feed-link"
                        to={
                          article.author.length &&
                          `/userpage/${article.author[0]._id}`
                        }
                      >
                        <img
                          className="feed-image"
                          src={
                            article.author.length
                              ? article.author[0].avatarUrl
                              : null
                          }
                          alt="author's avatar"
                        />
                        {article.author.length && article.author[0].username}
                      </Link>
                    </td>
                    <td>
                      <span className="category-feed">{article.category}</span>
                    </td>
                    <td className="table-text">
                      <Link
                        className="feed-article"
                        to={`/article/${article._id}`}
                      >
                        {article.title}
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </>
    );
  }
}
