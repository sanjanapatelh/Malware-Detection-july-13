import React, { Component } from 'react';
import { Form, Button, Input, Message,Segment,Header,Icon } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
  state = {
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createTestingNode()
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>

        <Segment>
        <Header as='h3'>
            <Icon name='user secret' />
            Create Testing Node
        </Header>

        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Tester!
          </Button>
        </Form>
       </Segment>
      </Layout>
    );
  }
}

export default CampaignNew;
