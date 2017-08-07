import React, { PropTypes } from 'react';
import { connection } from '../connection';
import Category from './Category';

export default class Categories extends React.Component {

  constructor(props, context) {
    super(props, context);
    console.log('KnowledgeBase.js.props: ', props);

    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangeHandler(e) {
    console.log('value:', e.target.value);
    connection.data.searchString = e.target.value
    let { data } = this.props;
    console.log('connection.data: ', connection.data);
    data.refetch({
      topicId: connection.data.topicId,
      searchString: connection.data.searchString,
    });
  }

  renderCategories() {
    const { kbTopic } = this.props;
    const categories = kbTopic.categories;
    console.log('kbTopic: ', kbTopic);
    console.log('categories: ', categories);

    return categories.map((category) => {
      return (
        <Category
          key={category._id}
          category={category}
        />
      );
    });
  }

  render() {
    return (
      <div className="erxes-form">
        <div className="erxes-topbar thiner">
          <div className="erxes-middle">
            <input onChange={this.onChangeHandler} value={connection.data.searchString} />
          </div>
        </div>

        <div>
          {this.renderCategories()}
        </div>
      </div>
    );
  }
}

Categories.propTypes = {
  kbTopic: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,

    categories: PropTypes.arrayOf(PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,

      articles: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string,
        summary: PropTypes.string,
        content: PropTypes.string,
      })),
    })),
  }),
};
