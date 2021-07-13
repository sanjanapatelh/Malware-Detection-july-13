import React, { Component } from 'react';
import { Form, Input, Message, Button ,Card, Grid} from 'semantic-ui-react';
import Campaign from '../ethereum/testingNode';
import web3 from '../ethereum/web3';
import { Router } from '../routes';
import Link from 'next/link';

class ContributeForm extends Component {
  state = {
    malwareAddress: '',
    errorMessage: '',
    loading: false,
    perCent: 0,
  };

  onSubmit = async event => {
    event.preventDefault();

    const campaign = Campaign(this.props.address);

    const percent = await campaign.methods.perCent(this.state.malwareAddress).call();

    this.setState({ loading: true, errorMessage: '',perCent : percent  });

    try {


      Router.replaceRoute(`/campaigns/test/${this.props.address}`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false, value: ''});
  };

  renderCards() {

    const items = [
     
      {
        header: this.state.perCent,
        meta: 'Percent malware',
        description:
          ''
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Malware Address</label>
          <Input
            value={this.state.malwareAddress}
            onChange={event => this.setState({ malwareAddress: event.target.value })}
            label="address"
            labelPosition="right"
          />

          <br/>
          <br/>

          <Button primary loading={this.state.loading}>
            Get percent reported!
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
