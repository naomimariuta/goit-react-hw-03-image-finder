import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FiSearch } from 'react-icons/fi';
import styles from './SearchForm.module.css';

class SearchForm extends Component {
  handleClick = () => {
    const { onChange } = this.props;
    onChange({ target: { value: '' } });
  };

  render() {
    const { onSubmit, onChange, query } = this.props;
    return (
      <form className={styles.SearchForm} onSubmit={onSubmit}>
        <button type="submit" className={styles['SearchForm-button']}>
          <FiSearch size={24} />
          <span className={styles['SearchForm-button-label']}>Search</span>
        </button>

        <input
          className={styles['SearchForm-input']}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Type something to search..."
          value={query}
          onChange={onChange}
          onClick={this.handleClick}
        />
      </form>
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

export default SearchForm;
