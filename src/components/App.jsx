import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Scroll from './Scroll/Scroll';
import Button from './Button/Button';
import Modal from './Modal/Modal';
import { pixabaySearch } from './service/pixabayAPI';
import Notiflix from 'notiflix';

class App extends Component {
  state = {
    images: [],
    isLoading: false,
    error: null,
    query: '',
    page: 1,
    showModal: false,
    selectedImage: null,
    isLastPage: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    if (prevState.query !== query) {
      this.fetchImages(true);
    }
  }

  fetchImages = async (isNewQuery = false) => {
    const { query, page } = this.state;

    if (!query) {
      Notiflix.Notify.info('Please enter a search query!', {
        position: 'center-center',
        timeout: 3000,
        width: '450px',
      });
      return;
    }

    this.setState({ isLoading: true });

    try {
      const { images: newImages, totalHits } = await pixabaySearch(
        query,
        isNewQuery ? 1 : page
      );

      if (!newImages.length && isNewQuery) {
        Notiflix.Notify.info('No result found for your query', {
          position: 'center-center',
          timeout: 3000,
          width: '450px',
        });
      }

      this.setState(prevState => ({
        images: isNewQuery ? newImages : [...prevState.images, ...newImages],
        page: isNewQuery ? 2 : prevState.page + 1,
        isLastPage: prevState.images.length + newImages.length >= totalHits,
        error: null,
      }));

      if (!isNewQuery) {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    } catch (error) {
      Notiflix.Notify.failure(`Failed to fetch images: ${error.message}`, {
        position: 'center-center',
        timeout: 3000,
        width: '450px',
      });
      this.setState({ error: error.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSubmit = query => {
    if (this.state.query !== query.trim()) {
      this.setState({
        query: query.trim(),
        images: [],
        page: 1,
        isLastPage: false,
        error: null,
      });
    }
  };

  handleImageClick = image => {
    this.setState({ selectedImage: image, showModal: true });
    document.body.style.overflow = 'hidden';
  };

  handleModalClose = () => {
    this.setState({ selectedImage: null, showModal: false });
    document.body.style.overflow = 'auto';
  };

  render() {
    const { images, isLoading, error, showModal, selectedImage, isLastPage } =
      this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSubmit} />
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        <ImageGallery images={images} onImageClick={this.handleImageClick} />
        {isLoading && <Loader />}
        {!isLoading && images.length > 0 && !isLastPage && (
          <Button onClick={() => this.fetchImages(false)} />
        )}
        {showModal && (
          <Modal image={selectedImage} onClose={this.handleModalClose} />
        )}
        <Scroll />
      </>
    );
  }
}

export default App;
