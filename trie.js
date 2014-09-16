Trie = function(){
  this.characters = {};
};

Trie.prototype.learn = function(word, index){
  // This function should add the given word,
  // starting from the given index,
  // to this Trie.
   if(index === undefined) {
    index = 0;
  }
  if (word[index] !== undefined) {
    if (this.characters[word[index]] === undefined) {
    this.characters[word[index]] = new Trie();
    this.characters[word[index]].learn(word, index+1);
    } else {
    this.characters[word[index]].learn(word, index+1);
    }
  } else {
    this.isWord = true;
  }

   // It will be recursive.  It will tell
  // the correct child of this Trie to learn the word
  // starting from a later index.

  // Consider what the learn function should do
  // when it reaches the end of the word?
  // A word does not necessarily end at a leaf.
  // You must mark nodes which are the ends of words,
  // so that the words can be reconstructed later.
};

Trie.prototype.getWords = function(words, currentWord){
  // This function will return all the words which are
  // contained in this Trie.
  // it will use currentWord as a prefix,
  // since a Trie doesn't know about its parents.
    if (words === undefined){
      words = [];
    }
    if(currentWord === undefined){
      currentWord = "";
    }

    if(this.isWord){
      words.push(currentWord);
    }

  for(var letter in this.characters){
    this.characters[letter].getWords(words,currentWord + letter);
  }

  return words;
};

Trie.prototype.find = function(word, index){
  // This function will return the node in the trie
  // which corresponds to the end of the passed in word.
  if(index === undefined){
    index =0;
  }

  if (this.characters[word[index]] === undefined){
    return false;
  } else {
      if (index === (word.length-1)){
      return this.characters[word[index]];
      } else {
        return this.characters[word[index]].find(word, index+1);
      }
  }
  // Be sure to consider what happens if the word is not in this Trie.
};

Trie.prototype.autoComplete = function(prefix){
  // This function will return all completions
  // for a given prefix.
  // It should use find and getWords.
var auto = this.find(prefix);
var array = [];

if (auto){
  var results = auto.getWords();
  for (var i = 0; i < results.length; i += 1){
    array.push(prefix+results[i]);
  }
}
return array;

};

try{
  module.exports = Trie;
} catch(e){

}