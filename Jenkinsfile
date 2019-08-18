pipeline {
  agent any
  stages {
    stage('npm install') {
      steps {
        sh 'npm install'
        sh 'npm --version'
      }
    }
    stage('npm run test:unit') {
      steps {
        sh 'npm run test:unit'
      }
    }
  }
}