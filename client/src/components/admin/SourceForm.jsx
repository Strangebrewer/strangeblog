import { useState } from "react";
import { connect } from 'react-redux';
import styled from 'styled-components';

import { Form, Input, Label, Select } from '../../styles/components';

import { save } from '../../redux/actions/sourceActions';

const BIASES = [
  { text: "Hard Left", value: "Hard_Left" },
  { text: "Left", value: "Left" },
  { text: "Left Center", value: "Left_Center" },
  { text: "Least Biased", value: "Least_Biased" },
  { text: "Right Center", value: "Right_Center" },
  { text: "Right", value: "Right" },
  { text: "Hard Right", value: "Hard_Right" },
];

const FACTUAL_REPORTING = [
  { text: "Very High", value: "Very_High" },
  { text: "High", value: "High" },
  { text: "Mostly Factual", value: "Mostly_Factual" },
  { text: "Mixed", value: "Mixed" },
  { text: "Low", value: "Low" },
  { text: "Very Low", value: "Very_Low" },
];

const CREDIBILITY = [
  "High",
  "Medium",
  "Low"
];

const SourceForm = props => {
  const [name, setName] = useState('');
  const [bias, setBias] = useState('');
  const [factualReporting, setFactualReporting] = useState('');
  const [credibility, setCredibility] = useState('');
  const [url, setUrl] = useState('');
  const [factCheckUrl, setFactCheckUrl] = useState('');
  const [error, setError] = useState('');

  function handleInputChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'bias':
        setBias(value);
        break;
      case 'factualReporting':
        setFactualReporting(value);
        break;
      case 'credibility':
        setCredibility(value);
        break;
      case 'url':
        setUrl(value);
        break;
      default:
        setFactCheckUrl(value);
    }
  }

  function validate() {
    const missingFields = [];
    let isValid = true;
    if (!name) missingFields.push('name');
    if (!bias) missingFields.push('bias');
    if (!factualReporting) missingFields.push('factualReporting');
    if (!credibility) missingFields.push('credibility');
    if (!url) missingFields.push('url');
    if (!factCheckUrl) missingFields.push('factCheckUrl');
    if (missingFields.length) {
      setError(`The following fields are missing: ${missingFields.join(', ')}`)
      isValid = false;
    }
    return isValid;
  }

  function save(event) {
    if (event) event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    let update = {};
    if (!props.source || !props.source.id) {
      update = {
        name,
        bias,
        factualReporting,
        credibility,
        url,
        factCheckUrl
      };
    } else {
      const { source } = props;
      update.id = source.id;
      if (source.name !== name) update.name = name;
      if (source.bias !== bias) update.bias = bias;
      if (source.factualReporting !== factualReporting) update.factualReporting = factualReporting;
      if (source.credibility !== credibility) update.credibility = credibility;
      if (source.url !== url) update.url = url;
      if (source.factCheckUrl !== factCheckUrl) update.factCheckUrl = factCheckUrl;
    }
    props.save(update);
  }

  return (
    <Form submit={save}>
      <h5>Source Form</h5>

      <InputWrapper>
        <Label>Organization:</Label>
        <Input
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>Bias:</Label>
        <Select
          name="bias"
          value={bias}
          onChange={handleInputChange}
        >
          <option value="">select one</option>
          {BIASES.map(b => (
            <option
              key={`bias-${b.value}`}
              value={b.value}
            >{b.text}</option>
          ))}
        </Select>
      </InputWrapper>

      <InputWrapper>
        <Label>Factual Reporting:</Label>
        <Select
          name="factualReporting"
          value={factualReporting}
          onChange={handleInputChange}
        >
          <option value="">select one</option>
          {FACTUAL_REPORTING.map(b => (
            <option
              key={`bias-${b.value}`}
              value={b.value}
            >{b.text}</option>
          ))}
        </Select>
      </InputWrapper>

      <InputWrapper>
        <Label>Credibility:</Label>
        <Select
          name="credibility"
          value={credibility}
          onChange={handleInputChange}
        >
          <option value="">select one</option>
          {CREDIBILITY.map(b => (
            <option
              key={`bias-${b}`}
              value={b}
            >{b}</option>
          ))}
        </Select>
      </InputWrapper>

      <InputWrapper>
        <Label>URL:</Label>
        <Input
          type="text"
          name="url"
          value={url}
          onChange={handleInputChange}
        />
      </InputWrapper>

      <InputWrapper>
        <Label>Media Bias Fact Check URL:</Label>
        <Input
          type="text"
          name="factCheckUrl"
          value={factCheckUrl}
          onChange={handleInputChange}
        />
      </InputWrapper>

      <p>{error ? error : ''}</p>
    </Form>
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl === "admin",
    blog: state.blog,
    sources: state.sources
  }
}

const mapDispatchToState = { save };

export default connect(mapPropsToState, mapDispatchToState)(SourceForm);

const InputWrapper = styled.div`
  margin: 12px 0;
`;
