<template>
  <el-dialog title="Excel上传" :visible.sync="visible" width='65%' top="10vh">
    <input id="excel-upload-input" ref="excel-upload-input" type="file" accept=".xlsx, .xls" class="c-hide"
           @change="handkeFileChange">
    <div class="excelSel" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      Excel导入,需要以导出的Excel为模板<br/>
      Excel文件拖动到或点击按钮上传
      <el-button style="margin-left:16px;" type="primary" @click="handleUpload">浏览</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import XLSX from 'xlsx'

  export default {
    data() {
      return {
        loading: false,
        excelData: {
          header: null,
          results: null
        },
        visible: false
      }
    },
    methods: {
      show() {
        this.visible = true
      },
      generateDate({header, results}) {
        this.excelData.header = header
        this.excelData.results = results
        this.$emit('on-selected-file', this.excelData)
      },
      handleDrop(e) {
        e.stopPropagation()
        e.preventDefault()
        const files = e.dataTransfer.files
        if (files.length !== 1) {
          this.$message.error('Only support uploading one file!')
          return
        }
        const itemFile = files[0] // only use files[0]
        this.readerData(itemFile)
        e.stopPropagation()
        e.preventDefault()
      },
      handleDragover(e) {
        e.stopPropagation()
        e.preventDefault()
        e.dataTransfer.dropEffect = 'copy'
      },
      handleUpload() {
        document.getElementById('excel-upload-input').click()
      },
      handkeFileChange(e) {
        const files = e.target.files
        const itemFile = files[0] // only use files[0]
        if (!itemFile) return
        this.readerData(itemFile)
        this.$refs['excel-upload-input'].value = null // fix can't select the same excel
      },
      readerData(itemFile) {
        const reader = new FileReader()
        reader.onload = e => {
          const data = e.target.result
          const fixedData = this.fixdata(data)
          const workbook = XLSX.read(btoa(fixedData), {type: 'base64'})
          const firstSheetName = workbook.SheetNames[0]
          const worksheet = workbook.Sheets[firstSheetName]
          const header = this.get_header_row(worksheet)
          const results = XLSX.utils.sheet_to_json(worksheet)
          this.generateDate({header, results})
        }
        reader.readAsArrayBuffer(itemFile)
      },
      fixdata(data) {
        let o = ''
        let l = 0
        const w = 10240
        for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)))
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)))
        return o
      },
      get_header_row(sheet) {
        const headers = []
        const range = XLSX.utils.decode_range(sheet['!ref'])
        let C
        const R = range.s.r
        /* start in the first row */
        for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
          var cell = sheet[XLSX.utils.encode_cell({c: C, r: R})]
          /* find the cell in the first row */
          var hdr = 'UNKNOWN ' + C // <-- replace with your desired default
          if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
          headers.push(hdr)
        }
        return headers
      }
    }
  }
</script>

<style scoped>
  #excel-upload-input {
    display: none;
    z-index: -9999;
  }

  .excelSel {
    border: 2px dashed #bbb;
    width: 600px;
    height: 160px;
    line-height: 80px;
    margin: 0 auto;
    font-size: 24px;
    border-radius: 5px;
    text-align: center;
    color: #bbb;
    position: relative;
  }
</style>
