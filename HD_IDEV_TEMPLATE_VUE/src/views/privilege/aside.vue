<template>
  <el-container style="height: 100%; ">
    <el-header height="10%" style="background: #fff300"></el-header>
    <el-container style="height: 100%; ">
      <el-aside width="40%" style="background: #ff0e00">
      </el-aside>
      <el-main>
        <el-container style="height: 100%; ">
          <el-aside width="40%" style="background: #e34e48" title="aside"></el-aside>
          <el-container style="height: 100%; ">
            <el-header height="10%" style="background: #edcf00" title="header"></el-header>
            <el-main style="background: #003eff" title="main"></el-main>
            <el-footer height="10%" style="background: #00ff15" title="footer"></el-footer>
          </el-container>
        </el-container>
      </el-main>
    </el-container>
    <el-footer height="10%" style="background: #24d400">
    </el-footer>
  </el-container>
</template>
