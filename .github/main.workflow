workflow "Build and test" {
  on = "push"
  resolves = ["lint", "test"]
}

action "build" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  args = "build"
}

action "lint" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["build"]
  args = "lint"
}

action "test" {
  uses = "actions/npm@3c8332795d5443adc712d30fa147db61fd520b5a"
  needs = ["build"]
  args = "test:unit"
}
