import React, { Component } from 'react';
import { Form, Input, Message, Button,Grid,Card } from 'semantic-ui-react';
import Campaign from '../ethereum/malware';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    errorMessage: '',
    loading: false,
    prob : 0
  };

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.consensus().send({
        from: accounts[0],
      });
      const probabilty = await campaign.methods.getProb().call();
      this.setState({prob : probabilty})

      Router.replaceRoute(`/campaigns/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false});
  };

  renderCards() {

    const items = [
      {
        header: this.state.prob,
        meta: 'Probabilty of Malware',
        description:
          '',
        style: { overflowWrap: 'break-word' }
      }

    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
      <Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Consensus!
        </Button>

        <br/>
        <br/>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
          </Grid.Row>
        </Grid>

        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />

      </Form>

    );
  }
}

export default ContributeForm;
