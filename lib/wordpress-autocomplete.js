'use babel';

import WordpressAutocompleteView from './wordpress-autocomplete-view';
import { CompositeDisposable } from 'atom';

export default {

  wordpressAutocompleteView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.wordpressAutocompleteView = new WordpressAutocompleteView(state.wordpressAutocompleteViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.wordpressAutocompleteView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'wordpress-autocomplete:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.wordpressAutocompleteView.destroy();
  },

  serialize() {
    return {
      wordpressAutocompleteViewState: this.wordpressAutocompleteView.serialize()
    };
  },

  toggle() {
    console.log('WordpressAutocomplete was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
