import React, { Component } from 'react';
import { Card, Grid, Button,Divider,Icon,Header,Segment } from 'semantic-ui-react';
import Layout from '../../../components/Layout';
import Campaign from '../../../ethereum/testingNode';
import factory from '../../../ethereum/factory';

import web3 from '../../../ethereum/web3';

import ApproveForm from '../../../components/ApproveForm';
import PercentGetForm from '../../../components/PercentGetForm';
import AnalyseForm from '../../../components/AnalyseForm';
import GetFileForm from '../../../components/GetFileFormMalware';
import DownloadForm from '../../../components/DownloadForm';
import  ByteForm from '../../../components/ByteForm';
//import  MalwaresForm from '../../../components/MalwaresForm';


import { Link } from '../../../routes';

class CampaignShow extends Component {
  static async getInitialProps(props) {
    const campaign = Campaign(props.query.address);
    const campaigns = await factory.methods.getDeployedMalwares().call();

    const summary = await campaign.methods.trustValue().call();
    const myaddress = await campaign.methods.nodeAddress().call();

    return {
      address: props.query.address,
      trustValue : summary,
      myAddress : myaddress,
      campaignsNew : campaigns

    };
  }

  renderCampaigns() {
    const items = this.props.campaignsNew.map(address => {
      return {
        header: address,
        description: (
          <Link route={`/campaigns/${address}`}>
            <a>View Malware</a>
          </Link>
        ),
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  }


  renderCards() {
    const {
      address,
      trustValue,
      myAddress

    } = this.props;

    const items = [
      {
        header: address,
        meta: 'Address of Test Node',
        description:
          '',
        style: { overflowWrap: 'break-word' }
      },
      {
        header: trustValue,
        meta: 'Trust Value',
        description:
          'Trust Value of Node which changes based on action'
      },
      {
        header: myAddress,
        meta: 'My address',
        description:
          '',
        style: { overflowWrap: 'break-word' }

       }

    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>

      <Header as='h3'>
          <Icon name='user' />
          Details
      </Header>
        <Grid>
          <Grid.Row>
            {this.renderCards()}
          </Grid.Row>

    <Segment.Group>

          <Segment>
            <Header as='h3'>
                <Icon name='bug' />
                Malwares Reported
            </Header>
                <Grid.Row>
                    {this.renderCampaigns()}
                </Grid.Row>

                </Segment>
        <Segment.Group horizontal>
                <Segment>

            <Header as='h3'>
                <Icon name="percent"/>
                Percentage Malware Reported
            </Header>
                <Grid.Row>
                  <PercentGetForm address={this.props.address} />
                </Grid.Row>

                </Segment>

                <Segment>

            <Header as='h3'>
                    <Icon name="percent"/>
                        Report
            </Header>
                    <Grid.Row>
                      <ApproveForm address={this.props.address} />
                    </Grid.Row>


            </Segment>
        </Segment.Group>


                    <Segment>

                    <Header as='h3'>
                        <Icon name='file alternate outline' />
                        Get File Url
                    </Header>
                                <Grid.Row>
                                    <GetFileForm address={this.props.address}/>
                                </Grid.Row>

                    </Segment>


               <Segment.Group horizontal>
                    <Segment>
                            <Header as='h3'>
                                <Icon name='file alternate outline' />
                                Analysing Files
                            </Header>

                                    <Grid.Row>
                                        <AnalyseForm />
                                    </Grid.Row>

                                    </Segment>
                                <Segment>

                    <Header as='h3'>
                        <Icon name='download' />
                        Download File
                    </Header>

                            <Grid.Row>
                                <DownloadForm />
                            </Grid.Row>

                            </Segment>
                     </Segment.Group>
      
      </Segment.Group>


        </Grid>
      </Layout>
    );
  }
}

export default CampaignShow;
