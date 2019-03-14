<template>
  <a class="uploader"
    href="#"
    @click="selectFile()"
    @drop.prevent="onFileDrop($event)"
    @dragover.prevent
  >
    <input
      type="file"
      class="hidden"
      ref="input"
      @change="onFileSelected($event)"
    />

    <p class="m-0"><font-awesome-icon :icon="faUpload" />
      {{  text || 'Upload an image' }}
    </p>

    <p v-if="errorMessage" class="error mt-2 mb-0">
      {{errorMessage}}
    </p>
  </a>
</template>

<script>
import { faUpload } from '@fortawesome/pro-light-svg-icons';

export default {
  name: 'teedev-image-uploader',
  props: {
    callback: Function,
    text: String,
  },
  data: () => ({
    fileReader: false,
    faUpload,
    validMimeTypes: [
      'image/png',
      'image/jpeg',
    ],
    errorMessage: false,
  }),
  methods: {
    createFileReader() {
      const fileReader = new FileReader();
      fileReader.onload = this.onFileLoad;
      fileReader.onerror = this.onFileError;
      this.fileReader = fileReader;
    },
    onFileLoad(e) {
      // TODO: Add compression
      const img = new Image();
      img.src = e.target.result;

      img.onload = () => {
        if (this.callback) {
          this.callback(img, e.target.result);
        }
      };
    },
    onFileError(e) {
      // TODO: ...something
      console.log(e);
    },
    selectFile() {
      this.$refs.input.click();
    },
    onFileSelected(e) {
      this.errorMessage = false;
      if (e.target.files[0]) {
        const file = e.target.files[0];
        if (this.validMimeTypes.includes(file.type)) {
          this.fileReader.readAsDataURL(file);
        } else {
          this.error('Invalid file type');
        }
      } else {
        this.error('No file received');
      }
    },
    error(message) {
      this.errorMessage = message;
    },
    onFileDrop(e) {
      let file;
      if (e.dataTransfer.items) {
        [file] = e.dataTransfer.items;
        file.getAsFile();
      } else {
        [file] = e.dataTransfer.files;
      }
      this.fileReader.readAsDataURL(file);
    },
  },
  mounted() {
    this.createFileReader();
  },
};
</script>

<style scoped lang="scss">

.uploader {
  display: block;
  border: 2px dashed #c9c9c9;
  background: #e3e3e3;
  padding: 1em;
}

.error {
  color: $color-error;
}

</style>
