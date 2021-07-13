import React, { Component } from 'react';
import { Card, Grid, Button ,Segment,Header,Icon} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/malware';
import web3 from '../../ethereum/web3';
import ConsentForm from '../../components/ConsentForm';
import ByteForm from '../../components/ByteForm';
import GetFileFormMalware from '../../components/GetFileFormMalware';




import { Link } from '../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);

    const summary = await campaign.methods.getSummary().call();


    return {
      address: props.query.address,
      addedAddress: summary[0],
      prob: summary[1],
      deployedUser: summary[2],
      MalwareHash: summary[3],
      amount: summary[4],
      perCentMalware: summary[5],


    };
  }

  renderCards() {
    const {
      address,
      prob,
      deployedUser,
      MalwareHash,
      amount,
      perCentMalware,


    } = this.props;

    const items = [
      {
        header: deployedUser,
        meta: 'Address of User',
        description:
          'The user uploaded this malware.',
        style: { overflowWrap: 'break-word' },
        color : 'blue',

      },
      {
        header: amount,
        meta: 'Amount(wei)',
        description:
          'This amount offered by user for getting files checked.',
        color : 'blue'
      },
      {
        header: address,
        meta: 'Address of Malware',
        description:
          'Address of current malware contract',
        style: { overflowWrap: 'break-word' },
        color : 'blue'
      },
      {
        header: perCentMalware,
        meta: 'Percent of malware',
        description:
          'Percent of malware detected after nodes report',
        color : 'blue'
      },
      {
        header: MalwareHash,
        meta: 'Hash of Malware',
        description:
          'The sha256 hash for this malware',
        style: { overflowWrap: 'break-word' },
        color : 'blue'
    },
    {
      header: prob,
      meta: 'Probabilty Malware',
      description:
        '',
      style: { overflowWrap: 'break-word' },
      color : 'blue'
    }

    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>

        <Segment.Group>

        <Segment>
        <Header as='h3'>
            <Icon name='bug' />
           Details
        </Header>
        </Segment>

              <Segment>

        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>

            <Grid.Column width={6}>
                <ConsentForm address={this.props.address} />
                    <br/><br/>
                <GetFileFormMalware/>
            </Grid.Column>

          </Grid.Row>

        </Grid>
        </Segment>
        </Segment.Group>


      </Layout>
    );
  }
}

export default CampaignShow;
