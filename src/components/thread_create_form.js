import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import Dropzone from 'react-dropzone-component';

class ThreadCreateForm extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      image: undefined,
      showThreadCreateForm: false
    }
  }
  render() {
    const {onSubmit} = this.props;
    const {showThreadCreateForm} = this.state;

    if (showThreadCreateForm) return (
      <div>
        <Button onClick={() => this.setState({showThreadCreateForm: false})}>
          Закрыть форму постинга
        </Button>
        <Form>
          <Form.Field
            label='Пост'
            control='textarea'
            rows='3'
            onChange={
              (event) => this.setState({ text: event.target.value })
            }
          />
          <Form.Field>
            <Dropzone
              config={{ postUrl: 'no-url' }}
              eventHandlers={{
                addedfile: (file) => this.setState({ image: file })
              }}
              djsConfig={{ autoProcessQueue: false }}
            />
          </Form.Field>
          <Button onClick={this.submit.bind(this)}>Отправить</Button>
        </Form>
      </div>
    );
    else return (
      <Button onClick={() => this.setState({showThreadCreateForm: true})}>
        Создать тред
      </Button>
    )
  }

  submit(event) {
    const {text, image} = this.state;
    const {onSubmit} = this.props;

    event.preventDefault();

    let formData = new FormData();
    formData.append('text', text);
    formData.append('image', image);

    fetch('/thread', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(json => {
        onSubmit(json.threads);
        this.setState({
          text: '',
          image: undefined,
          showThreadCreateForm: false,
        });
      });
  }
}

export default ThreadCreateForm;
