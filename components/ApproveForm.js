import React, { Component } from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../ethereum/testingNode';
import web3 from '../ethereum/web3';
import { Router } from '../routes';

class ContributeForm extends Component {
  state = {
    value: '',
    malwareAddress: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.approve(this.state.malwareAddress,this.state.value).send({
        from: accounts[0],
        malwareAddress : this.state.malwareAddress,
        value: this.state.value
      });

      Router.replaceRoute(`/campaigns/test/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: '' ,malwareAddress:''});
  };

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>

        <Form.Field>
          <label>Percent Malware</label>
          <Input
            value={this.state.value}
            onChange={event => this.setState({ value: event.target.value })}
            label="percent"
            labelPosition="right"
          />
          <br/>
          <br/>
          <label>Malware Address</label>
          <Input
            value={this.state.malwareAddress}
            onChange={event => this.setState({ malwareAddress: event.target.value })}
            label="address"
            labelPosition="right"
          />

        </Form.Field>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button primary loading={this.state.loading}>
          Approve!
        </Button>
      </Form>
    );
  }
}

export default ContributeForm;
