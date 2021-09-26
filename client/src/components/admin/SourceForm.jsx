import { useEffect, useState } from "react";
import { connect } from 'react-redux';

import { saveSource } from '../../redux/actions/sourceActions';

const BIASES = [
  { text: "Hard Left", value: "Hard_Left" },
  { text: "Left", value: "Left" },
  { text: "Left Center", value: "Left_Center" },
  { text: "Least Biased", value: "Least_Biased" },
  { text: "Right Center", value: "Right_Center" },
  { text: "Right", value: "Right" },
  { text: "Hard Right", value: "Hard_Right" },
];

const CREDIBILITY = [
  "High",
  "Medium",
  "Low"
];

const FACTUAL_REPORTING = [
  { text: "Very High", value: "Very_High" },
  { text: "High", value: "High" },
  { text: "Mostly Factual", value: "Mostly_Factual" },
  { text: "Mixed", value: "Mixed" },
  { text: "Low", value: "Low" },
  { text: "Very Low", value: "Very_Low" },
];

const SourceForm = props => {
  const [name, setName] = useState('');
  const [bias, setBias] = useState('');
  const [factualReporting, setFactualReporting] = useState('');
  const [credibility, setCredibility] = useState('');
  const [category, setCategory] = useState('');
  const [url, setUrl] = useState('');
  const [factCheckUrl, setFactCheckUrl] = useState('');
  const [error, setError] = useState('');

  const { source, toggleEditable } = props;

  useEffect(() => {
    (function () {
      if (source) {
        setName(source.name);
        setBias(source.bias);
        setFactualReporting(source.factualReporting);
        setCredibility(source.credibility);
        setCategory(source.category);
        setUrl(source.url);
        setFactCheckUrl(source.factCheckUrl);
      }
    })();
  }, [source]);

  function handleInputChange({ target }) {
    const { name, value } = target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'bias':
        setBias(value);
        break;
      case 'reporting':
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

  async function save(event) {
    if (event) event.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    let update = {};
    if (!source || !source.id) {
      update = {
        name,
        bias,
        factualReporting,
        credibility,
        url,
        factCheckUrl
      };
    } else {
      update.id = source.id;
      if (source.name !== name) update.name = name;
      if (source.bias !== bias) update.bias = bias;
      if (source.factualReporting !== factualReporting) update.factualReporting = factualReporting;
      if (source.credibility !== credibility) update.credibility = credibility;
      if (source.url !== url) update.url = url;
      if (source.factCheckUrl !== factCheckUrl) update.factCheckUrl = factCheckUrl;
    }
    await props.saveSource(update);
    toggleEditable();
  }

  return (
    <>
      <form submit={save} className="main-container">
        <input
          className="name-input"
          type="text"
          name="name"
          value={name}
          onChange={handleInputChange}
        />
        <select
          className="bias-input"
          name="bias"
          value={bias}
          onChange={handleInputChange}
        >
          {BIASES.map((bias) => {
            return <option key={`bias-${bias.value}`} value={bias.value}>{bias.text}</option>
          })}
        </select>
        <select
          className="credibility-input"
          name="credibility"
          value={credibility}
          onChange={handleInputChange}
        >
          {CREDIBILITY.map((cred) => {
            return <option key={`cred-${cred}`} value={cred}>{cred}</option>
          })}
        </select>
        <select
          className="reporting-input"
          name="reporting"
          value={factualReporting}
          onChange={handleInputChange}
        >
          {FACTUAL_REPORTING.map((fax) => {
            return <option key={`fax-${fax.value}`} value={fax.value}>{fax.text}</option>
          })}
        </select>
        <select
          className="category-input"
          name="category"
          value={category}
          onChange={handleInputChange}
        >
          {["Conservative", "Liberal", "Neutral"].map((cat, i) => {
            return <option key={`cat-${i}`} value={cat}>{cat}</option>
          })}
        </select>


        <div className="urls">
          <input
            type="text"
            name="url"
            value={url}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="factCheckUrl"
            value={factCheckUrl}
            onChange={handleInputChange}
          />
        </div>

        <p>{error ? error : ''}</p>
      </form>

      <div className="buttons">
        <button onClick={toggleEditable}>
          <i className="fas fa-undo" />
        </button>

        <button onClick={save}>
          <i className="fas fa-save" />
        </button>
      </div>
    </>
  )
}

function mapPropsToState(state) {
  return {
    admin: state.user.acl && state.user.acl.includes('admin'),
    blog: state.blog,
    sources: state.sources
  }
}

const mapDispatchToState = { saveSource };

export default connect(mapPropsToState, mapDispatchToState)(SourceForm);
