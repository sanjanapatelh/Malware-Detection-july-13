import React, { Component } from 'react';
import { Form, Button, Input, Message,Segment ,Header,Icon} from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';
import GetFileFormMalware from '../../components/GetFileFormMalware';




class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    filePath:'',
    malwareHash : '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async event => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .createMalware(this.state.malwareHash,this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

      Router.pushRoute('/');
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  onUpload = async event => {

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"filepath":this.state.filePath,"hash":this.state.malwareHash});

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
      };

fetch("http://localhost:3000/api/uploadFile", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));


    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>

      <Segment>

      <Header as='h3'>
          <Icon name='key' />

      </Header>
      <Form  error={!!this.state.errorMessage}>

        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} >
        <a target="_blank" href="https://emn178.github.io/online-tools/sha256_checksum.html" rel="noopener noreferrer">
            Sha256 Hash!
        </a>
        </Button>
      </Form>

      </Segment>

      <Segment.Group horizontal>
           <Segment>
           <br/>

           <Header as='h3'>
               <Icon name='upload' />
               Upload Malware File
           </Header>

           <br/>

      <Form onSubmit={this.onUpload} error={!!this.state.errorMessage}>
        <Form.Field>
          <label>Malware Hash</label>
          <Input
            label="string"
            labelPosition="right"
            value={this.state.malwareHash}
            onChange={event =>
              this.setState({ malwareHash : event.target.value })}
          />


          <label>File Path</label>
          <Input
            label="path"
            labelPosition="right"
            value={this.state.filePath}
            onChange={event =>
              this.setState({ filePath: event.target.value })}
          />
        </Form.Field>
        <Message error header="Oops!" content={this.state.errorMessage} />
        <Button loading={this.state.loading} >
            Upload!
        </Button>
      </Form>

      </Segment>
      <Segment>

            <br/>

        <Header as='h3'>
            <Icon name='linkify' />
            Get File Link
        </Header>

        <br/>
            <GetFileFormMalware address={this.props.address}/>
            </Segment>
            </Segment.Group>

        <Segment>
        <br/>
        <Header as='h3'>
            <Icon name='add' />
            Create New Malware
        </Header>
        <br/>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Malware Hash</label>
            <Input
              label="string"
              labelPosition="right"
              value={this.state.malwareHash}
              onChange={event =>
                this.setState({ malwareHash : event.target.value })}
            />

            <br/><br/>

            <label>Minimum Contribution</label>
            <Input
              label="wei"
              labelPosition="right"
              value={this.state.minimumContribution}
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />

            <br/><br/>

            <label>Link</label>
            <Input
              label="address"
              labelPosition="right"
              value={this.state.url}
              onChange={event =>
                this.setState({ url: event.target.value })}
            />
          </Form.Field>



          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>


        </Segment>



       <br/><br/>


      </Layout>
    );
  }
}

export default CampaignNew;
