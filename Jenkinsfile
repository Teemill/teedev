pipeline {
  agent any
  stages {
    stage('Slack Message') {
      steps {
        slackSend(channel: 'pipeline')
      }
    }
  }
}