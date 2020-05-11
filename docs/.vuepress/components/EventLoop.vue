<template>
  <div>
    <textarea v-model="executeCommand" ref="textarea" class="textarea"></textarea>
    <div class="execute-wrapper">
      <div class="btn-wrapper">
        <button @click="execute" class="execute-btn">EXECUTE</button>
        <button @click="clear" class="clear-btn">CLEAR</button>
      </div>
      <div class="result-wrapper">
        <p class="result" v-for="item in result">{{item}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  mounted() {
    HTMLTextAreaElement.prototype.getCaretPosition = function() {
      //return the caret position of the textarea
      return this.selectionStart;
    };
    HTMLTextAreaElement.prototype.setCaretPosition = function(position) {
      //change the caret position of the textarea
      this.selectionStart = position;
      this.selectionEnd = position;
      this.focus();
    };
    HTMLTextAreaElement.prototype.hasSelection = function() {
      //if the textarea has selection then return true
      if (this.selectionStart == this.selectionEnd) {
        return false;
      } else {
        return true;
      }
    };
    HTMLTextAreaElement.prototype.getSelectedText = function() {
      //return the selection text
      return this.value.substring(this.selectionStart, this.selectionEnd);
    };
    HTMLTextAreaElement.prototype.setSelection = function(start, end) {
      //change the selection area of the textarea
      this.selectionStart = start;
      this.selectionEnd = end;
      this.focus();
    };
    var textarea = this.$refs.textarea;
    textarea.onkeydown = function(event) {
      //support tab on textarea
      if (event.keyCode == 9) {
        //tab was pressed
        var newCaretPosition;
        newCaretPosition = textarea.getCaretPosition() + "  ".length;
        textarea.value =
          textarea.value.substring(0, textarea.getCaretPosition()) +
          "  " +
          textarea.value.substring(
            textarea.getCaretPosition(),
            textarea.value.length
          );
        textarea.setCaretPosition(newCaretPosition);
        return false;
      }
      if (event.keyCode == 8) {
        //backspace
        if (
          textarea.value.substring(
            textarea.getCaretPosition() - 4,
            textarea.getCaretPosition()
          ) == "  "
        ) {
          //it's a tab space
          var newCaretPosition;
          newCaretPosition = textarea.getCaretPosition() - 3;
          textarea.value =
            textarea.value.substring(0, textarea.getCaretPosition() - 3) +
            textarea.value.substring(
              textarea.getCaretPosition(),
              textarea.value.length
            );
          textarea.setCaretPosition(newCaretPosition);
        }
      }
      if (event.keyCode == 37) {
        //left arrow
        var newCaretPosition;
        if (
          textarea.value.substring(
            textarea.getCaretPosition() - 4,
            textarea.getCaretPosition()
          ) == "  "
        ) {
          //it's a tab space
          newCaretPosition = textarea.getCaretPosition() - 3;
          textarea.setCaretPosition(newCaretPosition);
        }
      }
      if (event.keyCode == 39) {
        //right arrow
        var newCaretPosition;
        if (
          textarea.value.substring(
            textarea.getCaretPosition() + 4,
            textarea.getCaretPosition()
          ) == "  "
        ) {
          //it's a tab space
          newCaretPosition = textarea.getCaretPosition() + 3;
          textarea.setCaretPosition(newCaretPosition);
        }
      }
    };
  },
  data() {
    return {
      executeCommand: "",
      result: []
    };
  },
  methods: {
    clear() {
      this.executeCommand = "";
      this.result = [];
    },
    execute() {
      this.result = [];
      try {
        var reg = /(console.log\((.+?)\))/gi;
        var result = this.result;
        var newCommand = this.executeCommand.replace(reg, function(
          match,
          p1,
          p2
        ) {
          return match + `; result.push(${p2}); `;
        });
        eval(newCommand);
      } catch (err) {
        this.result.push(err);
      }
    }
  }
};
</script>

<style scoped>
.textarea {
  margin-bottom: 15px;
  display: block;
  width: 711px;
  height: 300px;
  resize: vertical;
}
.execute-wrapper {
  overflow: hidden;
}

.btn-wrapper {
  float: left;
  margin-right: 15px;
}
.execute-btn,
.clear-btn {
  margin-bottom: 10px;
  display: block;
  width: 100px;
  background-color: #fff;
  color: #333;
  padding: 0.5em;
  border: 2px solid #333;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}
.execute-btn:hover,
.clear-btn:hover {
  background-color: #333;
  color: #fff;
}
.result-wrapper {
  padding: 10px;
  width: 580px;
  height: 150px;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #fff;
  border: 1px solid #eaf2f4;
  box-shadow: 2px 2px 5px -2px rgba(0, 0, 0, 0.1);
}
.result {
  line-height: 1.5;
  margin: 0;
  padding: 0;
  font-size: 14px;
}
</style>
