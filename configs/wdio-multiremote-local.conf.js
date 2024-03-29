/**
 * wdio configs for running in local env
 * Test Framework : Cucumber
 * Capability: Web + Android Tests
 * @author Krishna S.
 */
const { TimelineService } = require('wdio-timeline-reporter/timeline-service');
const path = require('path');
const { config } = require('./wdio.shared.conf');

config.specs = [
    '../test/**/WebAndAndroid.feature'
]

config.maxInstances = 1

config.capabilities = {
    webClient: {
        capabilities: {
            browserName: 'firefox'
        }
    },
    androidClient: {
        // for running tests on android app
        // capabilities: {
        //     platformName: 'Android',
        //     "appium:deviceName": 'emulator-5554',
        //     'appium:app': path.join(process.cwd(), './app.apk'),
        //     "appium:platformVersion": '10.0.0',
        //     "appium:automationName": 'UIAutomator2',
        //     "appium:autoGrantPermissions": true,
        //     "appium:idleTimeout": 100000
        // }
        // for running tests on android chrome browser
        capabilities: {
            platformName: 'android',
            'appium:deviceName': 'emulator-5554',
            'appium:browserName': 'Chrome',
            'appium:platformVersion': '10.0.0',
            'appium:automationName': 'uiautomator2',
            'appium:autoGrantPermissions': true,
            'appium:idleTimeout': 100000
        }
    }
}
config.services = [
    ['geckodriver', {

        hostname: 'localhost',
        port: 9515

    }],
    ['appium', {
        args: {
            address: '127.0.0.1',
            port: 4723,
            relaxedSecurity: true,
            "base-path": '/wd/hub'
        },
        command: 'appium',
        logPath: './'
    }],
    [TimelineService]
],
    config.reporters = [
        [
            'spec', {
                addConsoleLogs: true,
            },
        ],
        [
            'allure', {
                outputDir: 'reports/multiremote-local/allure-results',
                disableWebdriverStepsReporting: true,
                disableWebdriverScreenshotsReporting: false,
                useCucumberStepReporter: true,
            }
        ],
        [
            'cucumberjs-json', {
                jsonFolder: 'reports/multiremote-local/cucumberjs-json-reports',
                language: 'en',
            },
        ],
        [
            'timeline', {
                outputDir: 'reports/multiremote-local/timeline-reports',
                screenshotStrategy: 'on:error'
            }
        ],
        [
            'junit', {
                outputDir: 'reports/multiremote-local/junit-reports',
            }
        ]
    ]

exports.config = config