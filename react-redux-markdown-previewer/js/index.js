// Redux:
const ADD = "ADD";

const newInput = input => {
  return {
    type: ADD,
    input };

};

const defaultState = "# Header\n## Subheader\n\n[Link](https://www.freecodecamp.com)\n\n`<div>Inline code</div>`\n\n```\nfunction codeBlock {\n    return true\n} \n```\n\n- List item #1\n- List item #2\n\n> Block quote\n\n![Anchovy](https://upload.wikimedia.org/wikipedia/commons/e/e4/Anchovy_%28PSF%29.png)\n\n**Bolded text**";

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD:
      return action.input;
    default:
      return state;}

};

const store = Redux.createStore(reducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }
  change(event) {
    this.props.makeNewInput(event.target.value);
  }
  componentDidMount() {
    let links = document.getElementsByTagName('a'); //stackoverflow is amazing
    for (let i = 0; i < links.length; i++) {
      links[i].target = "_blank";
    }
  }
  componentDidUpdate(prevProps, prevState) {
    let links = document.getElementsByTagName('a');
    for (let i = 0; i < links.length; i++) {
      links[i].target = "_blank";
    }
  }
  render() {
    return (
      React.createElement("div", null,
      React.createElement("div", { id: "editors-cap" },
      React.createElement("i", { className: "far fa-edit icons" }), "Editor"),


      React.createElement("textarea", {
        id: "editor",
        value: this.props.input,
        onChange: this.change }), React.createElement("br", null),
      React.createElement("div", { id: "preview-cap" },
      React.createElement("i", { className: "far fa-clipboard icons" }), "Preview"),


      React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: marked(this.props.input, { breaks: true }) } })));


  }}
;

const mapStateToProps = state => {
  return { input: state };
};

const mapDispatchToProps = dispatch => {
  return {
    makeNewInput: input => {
      dispatch(newInput(input));
    } };

};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class App extends React.Component {
  render() {
    return (
      React.createElement(Provider, { store: store },
      React.createElement(Container, null)));


  }}
;

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

/*The same code having been refactored by jenovs, saved here for reference
                                                                                 
                                                                                 const App = ({ defaultState }) => {
                                                                                   const [input, setInput] = React.useState(defaultState);
                                                                                 
                                                                                   const renderer = new marked.Renderer();
                                                                                   marked.setOptions({ renderer });
                                                                                 
                                                                                   renderer.link = function(href, title, text) {
                                                                                     return marked.Renderer.prototype.link
                                                                                       .call(this, href, title, text)
                                                                                       .replace("<a", "<a target='_blank' ");
                                                                                   };
                                                                                 
                                                                                   return (
                                                                                     <div>
                                                                                       <div id="editors-cap">
                                                                                         <i className="far fa-edit icons" />
                                                                                         Editor
                                                                                       </div>
                                                                                       <textarea
                                                                                         id="editor"
                                                                                         value={input}
                                                                                         onChange={e => setInput(e.target.value)}
                                                                                       />
                                                                                       <br />
                                                                                       <div id="preview-cap">
                                                                                         <i className="far fa-clipboard icons" />
                                                                                         Preview
                                                                                       </div>
                                                                                       <div
                                                                                         id="preview"
                                                                                         dangerouslySetInnerHTML={{ __html: marked(input, { breaks: true }) }}
                                                                                       />
                                                                                     </div>
                                                                                   );
                                                                                 };
                                                                                 
                                                                                 const defaultState =
                                                                                   "# Header\n## Subheader\n\n[Link](https://www.freecodecamp.com)\n\n`<div>Inline code</div>`\n\n```\nfunction codeBlock {\n    return true\n} \n```\n\n- List item #1\n- List item #2\n\n> Block quote\n\n![Anchovy](https://upload.wikimedia.org/wikipedia/commons/e/e4/Anchovy_%28PSF%29.png)\n\n**Bolded text**";
                                                                                 
                                                                                 ReactDOM.render(
                                                                                   <App defaultState={defaultState} />,
                                                                                   document.getElementById("app")
                                                                                 );*/