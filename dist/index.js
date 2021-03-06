require('./sourcemap-register.js');
/******/ (() => {
  // webpackBootstrap
  /******/ var __webpack_modules__ = {
    /***/ 351: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.issue = exports.issueCommand = void 0;
      const os = __importStar(__nccwpck_require__(37));
      const utils_1 = __nccwpck_require__(278);
      /**
       * Commands
       *
       * Command Format:
       *   ::name key=value,key=value::message
       *
       * Examples:
       *   ::warning::This is the message
       *   ::set-env name=MY_VAR::some value
       */
      function issueCommand(command, properties, message) {
        const cmd = new Command(command, properties, message);
        process.stdout.write(cmd.toString() + os.EOL);
      }
      exports.issueCommand = issueCommand;
      function issue(name, message = '') {
        issueCommand(name, {}, message);
      }
      exports.issue = issue;
      const CMD_STRING = '::';
      class Command {
        constructor(command, properties, message) {
          if (!command) {
            command = 'missing.command';
          }
          this.command = command;
          this.properties = properties;
          this.message = message;
        }
        toString() {
          let cmdStr = CMD_STRING + this.command;
          if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
              if (this.properties.hasOwnProperty(key)) {
                const val = this.properties[key];
                if (val) {
                  if (first) {
                    first = false;
                  } else {
                    cmdStr += ',';
                  }
                  cmdStr += `${key}=${escapeProperty(val)}`;
                }
              }
            }
          }
          cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
          return cmdStr;
        }
      }
      function escapeData(s) {
        return utils_1
          .toCommandValue(s)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A');
      }
      function escapeProperty(s) {
        return utils_1
          .toCommandValue(s)
          .replace(/%/g, '%25')
          .replace(/\r/g, '%0D')
          .replace(/\n/g, '%0A')
          .replace(/:/g, '%3A')
          .replace(/,/g, '%2C');
      }
      //# sourceMappingURL=command.js.map

      /***/
    },

    /***/ 186: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.getIDToken =
        exports.getState =
        exports.saveState =
        exports.group =
        exports.endGroup =
        exports.startGroup =
        exports.info =
        exports.notice =
        exports.warning =
        exports.error =
        exports.debug =
        exports.isDebug =
        exports.setFailed =
        exports.setCommandEcho =
        exports.setOutput =
        exports.getBooleanInput =
        exports.getMultilineInput =
        exports.getInput =
        exports.addPath =
        exports.setSecret =
        exports.exportVariable =
        exports.ExitCode =
          void 0;
      const command_1 = __nccwpck_require__(351);
      const file_command_1 = __nccwpck_require__(717);
      const utils_1 = __nccwpck_require__(278);
      const os = __importStar(__nccwpck_require__(37));
      const path = __importStar(__nccwpck_require__(17));
      const oidc_utils_1 = __nccwpck_require__(41);
      /**
       * The code to exit an action
       */
      var ExitCode;
      (function (ExitCode) {
        /**
         * A code indicating that the action was successful
         */
        ExitCode[(ExitCode['Success'] = 0)] = 'Success';
        /**
         * A code indicating that the action was a failure
         */
        ExitCode[(ExitCode['Failure'] = 1)] = 'Failure';
      })((ExitCode = exports.ExitCode || (exports.ExitCode = {})));
      //-----------------------------------------------------------------------
      // Variables
      //-----------------------------------------------------------------------
      /**
       * Sets env variable for this action and future actions in the job
       * @param name the name of the variable to set
       * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function exportVariable(name, val) {
        const convertedVal = utils_1.toCommandValue(val);
        process.env[name] = convertedVal;
        const filePath = process.env['GITHUB_ENV'] || '';
        if (filePath) {
          const delimiter = '_GitHubActionsFileCommandDelimeter_';
          const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
          file_command_1.issueCommand('ENV', commandValue);
        } else {
          command_1.issueCommand('set-env', {name}, convertedVal);
        }
      }
      exports.exportVariable = exportVariable;
      /**
       * Registers a secret which will get masked from logs
       * @param secret value of the secret
       */
      function setSecret(secret) {
        command_1.issueCommand('add-mask', {}, secret);
      }
      exports.setSecret = setSecret;
      /**
       * Prepends inputPath to the PATH (for this action and future actions)
       * @param inputPath
       */
      function addPath(inputPath) {
        const filePath = process.env['GITHUB_PATH'] || '';
        if (filePath) {
          file_command_1.issueCommand('PATH', inputPath);
        } else {
          command_1.issueCommand('add-path', {}, inputPath);
        }
        process.env[
          'PATH'
        ] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
      }
      exports.addPath = addPath;
      /**
       * Gets the value of an input.
       * Unless trimWhitespace is set to false in InputOptions, the value is also trimmed.
       * Returns an empty string if the value is not defined.
       *
       * @param     name     name of the input to get
       * @param     options  optional. See InputOptions.
       * @returns   string
       */
      function getInput(name, options) {
        const val =
          process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
        if (options && options.required && !val) {
          throw new Error(`Input required and not supplied: ${name}`);
        }
        if (options && options.trimWhitespace === false) {
          return val;
        }
        return val.trim();
      }
      exports.getInput = getInput;
      /**
       * Gets the values of an multiline input.  Each value is also trimmed.
       *
       * @param     name     name of the input to get
       * @param     options  optional. See InputOptions.
       * @returns   string[]
       *
       */
      function getMultilineInput(name, options) {
        const inputs = getInput(name, options)
          .split('\n')
          .filter((x) => x !== '');
        return inputs;
      }
      exports.getMultilineInput = getMultilineInput;
      /**
       * Gets the input value of the boolean type in the YAML 1.2 "core schema" specification.
       * Support boolean input list: `true | True | TRUE | false | False | FALSE` .
       * The return value is also in boolean type.
       * ref: https://yaml.org/spec/1.2/spec.html#id2804923
       *
       * @param     name     name of the input to get
       * @param     options  optional. See InputOptions.
       * @returns   boolean
       */
      function getBooleanInput(name, options) {
        const trueValue = ['true', 'True', 'TRUE'];
        const falseValue = ['false', 'False', 'FALSE'];
        const val = getInput(name, options);
        if (trueValue.includes(val)) return true;
        if (falseValue.includes(val)) return false;
        throw new TypeError(
          `Input does not meet YAML 1.2 "Core Schema" specification: ${name}\n` +
            `Support boolean input list: \`true | True | TRUE | false | False | FALSE\``
        );
      }
      exports.getBooleanInput = getBooleanInput;
      /**
       * Sets the value of an output.
       *
       * @param     name     name of the output to set
       * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function setOutput(name, value) {
        process.stdout.write(os.EOL);
        command_1.issueCommand('set-output', {name}, value);
      }
      exports.setOutput = setOutput;
      /**
       * Enables or disables the echoing of commands into stdout for the rest of the step.
       * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
       *
       */
      function setCommandEcho(enabled) {
        command_1.issue('echo', enabled ? 'on' : 'off');
      }
      exports.setCommandEcho = setCommandEcho;
      //-----------------------------------------------------------------------
      // Results
      //-----------------------------------------------------------------------
      /**
       * Sets the action status to failed.
       * When the action exits it will be with an exit code of 1
       * @param message add error issue message
       */
      function setFailed(message) {
        process.exitCode = ExitCode.Failure;
        error(message);
      }
      exports.setFailed = setFailed;
      //-----------------------------------------------------------------------
      // Logging Commands
      //-----------------------------------------------------------------------
      /**
       * Gets whether Actions Step Debug is on or not
       */
      function isDebug() {
        return process.env['RUNNER_DEBUG'] === '1';
      }
      exports.isDebug = isDebug;
      /**
       * Writes debug message to user log
       * @param message debug message
       */
      function debug(message) {
        command_1.issueCommand('debug', {}, message);
      }
      exports.debug = debug;
      /**
       * Adds an error issue
       * @param message error issue message. Errors will be converted to string via toString()
       * @param properties optional properties to add to the annotation.
       */
      function error(message, properties = {}) {
        command_1.issueCommand(
          'error',
          utils_1.toCommandProperties(properties),
          message instanceof Error ? message.toString() : message
        );
      }
      exports.error = error;
      /**
       * Adds a warning issue
       * @param message warning issue message. Errors will be converted to string via toString()
       * @param properties optional properties to add to the annotation.
       */
      function warning(message, properties = {}) {
        command_1.issueCommand(
          'warning',
          utils_1.toCommandProperties(properties),
          message instanceof Error ? message.toString() : message
        );
      }
      exports.warning = warning;
      /**
       * Adds a notice issue
       * @param message notice issue message. Errors will be converted to string via toString()
       * @param properties optional properties to add to the annotation.
       */
      function notice(message, properties = {}) {
        command_1.issueCommand(
          'notice',
          utils_1.toCommandProperties(properties),
          message instanceof Error ? message.toString() : message
        );
      }
      exports.notice = notice;
      /**
       * Writes info to log with console.log.
       * @param message info message
       */
      function info(message) {
        process.stdout.write(message + os.EOL);
      }
      exports.info = info;
      /**
       * Begin an output group.
       *
       * Output until the next `groupEnd` will be foldable in this group
       *
       * @param name The name of the output group
       */
      function startGroup(name) {
        command_1.issue('group', name);
      }
      exports.startGroup = startGroup;
      /**
       * End an output group.
       */
      function endGroup() {
        command_1.issue('endgroup');
      }
      exports.endGroup = endGroup;
      /**
       * Wrap an asynchronous function call in a group.
       *
       * Returns the same type as the function itself.
       *
       * @param name The name of the group
       * @param fn The function to wrap in the group
       */
      function group(name, fn) {
        return __awaiter(this, void 0, void 0, function* () {
          startGroup(name);
          let result;
          try {
            result = yield fn();
          } finally {
            endGroup();
          }
          return result;
        });
      }
      exports.group = group;
      //-----------------------------------------------------------------------
      // Wrapper action state
      //-----------------------------------------------------------------------
      /**
       * Saves state for current action, the state can only be retrieved by this action's post job execution.
       *
       * @param     name     name of the state to store
       * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      function saveState(name, value) {
        command_1.issueCommand('save-state', {name}, value);
      }
      exports.saveState = saveState;
      /**
       * Gets the value of an state set by this action's main execution.
       *
       * @param     name     name of the state to get
       * @returns   string
       */
      function getState(name) {
        return process.env[`STATE_${name}`] || '';
      }
      exports.getState = getState;
      function getIDToken(aud) {
        return __awaiter(this, void 0, void 0, function* () {
          return yield oidc_utils_1.OidcClient.getIDToken(aud);
        });
      }
      exports.getIDToken = getIDToken;
      /**
       * Summary exports
       */
      var summary_1 = __nccwpck_require__(327);
      Object.defineProperty(exports, 'summary', {
        enumerable: true,
        get: function () {
          return summary_1.summary;
        },
      });
      /**
       * @deprecated use core.summary
       */
      var summary_2 = __nccwpck_require__(327);
      Object.defineProperty(exports, 'markdownSummary', {
        enumerable: true,
        get: function () {
          return summary_2.markdownSummary;
        },
      });
      //# sourceMappingURL=core.js.map

      /***/
    },

    /***/ 717: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      // For internal use, subject to change.
      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.issueCommand = void 0;
      // We use any as a valid input type
      /* eslint-disable @typescript-eslint/no-explicit-any */
      const fs = __importStar(__nccwpck_require__(147));
      const os = __importStar(__nccwpck_require__(37));
      const utils_1 = __nccwpck_require__(278);
      function issueCommand(command, message) {
        const filePath = process.env[`GITHUB_${command}`];
        if (!filePath) {
          throw new Error(
            `Unable to find environment variable for file command ${command}`
          );
        }
        if (!fs.existsSync(filePath)) {
          throw new Error(`Missing file at path: ${filePath}`);
        }
        fs.appendFileSync(
          filePath,
          `${utils_1.toCommandValue(message)}${os.EOL}`,
          {
            encoding: 'utf8',
          }
        );
      }
      exports.issueCommand = issueCommand;
      //# sourceMappingURL=file-command.js.map

      /***/
    },

    /***/ 41: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.OidcClient = void 0;
      const http_client_1 = __nccwpck_require__(255);
      const auth_1 = __nccwpck_require__(526);
      const core_1 = __nccwpck_require__(186);
      class OidcClient {
        static createHttpClient(allowRetry = true, maxRetry = 10) {
          const requestOptions = {
            allowRetries: allowRetry,
            maxRetries: maxRetry,
          };
          return new http_client_1.HttpClient(
            'actions/oidc-client',
            [new auth_1.BearerCredentialHandler(OidcClient.getRequestToken())],
            requestOptions
          );
        }
        static getRequestToken() {
          const token = process.env['ACTIONS_ID_TOKEN_REQUEST_TOKEN'];
          if (!token) {
            throw new Error(
              'Unable to get ACTIONS_ID_TOKEN_REQUEST_TOKEN env variable'
            );
          }
          return token;
        }
        static getIDTokenUrl() {
          const runtimeUrl = process.env['ACTIONS_ID_TOKEN_REQUEST_URL'];
          if (!runtimeUrl) {
            throw new Error(
              'Unable to get ACTIONS_ID_TOKEN_REQUEST_URL env variable'
            );
          }
          return runtimeUrl;
        }
        static getCall(id_token_url) {
          var _a;
          return __awaiter(this, void 0, void 0, function* () {
            const httpclient = OidcClient.createHttpClient();
            const res = yield httpclient
              .getJson(id_token_url)
              .catch((error) => {
                throw new Error(`Failed to get ID Token. \n 
        Error Code : ${error.statusCode}\n 
        Error Message: ${error.result.message}`);
              });
            const id_token =
              (_a = res.result) === null || _a === void 0 ? void 0 : _a.value;
            if (!id_token) {
              throw new Error('Response json body do not have ID Token field');
            }
            return id_token;
          });
        }
        static getIDToken(audience) {
          return __awaiter(this, void 0, void 0, function* () {
            try {
              // New ID Token is requested from action service
              let id_token_url = OidcClient.getIDTokenUrl();
              if (audience) {
                const encodedAudience = encodeURIComponent(audience);
                id_token_url = `${id_token_url}&audience=${encodedAudience}`;
              }
              core_1.debug(`ID token url is ${id_token_url}`);
              const id_token = yield OidcClient.getCall(id_token_url);
              core_1.setSecret(id_token);
              return id_token;
            } catch (error) {
              throw new Error(`Error message: ${error.message}`);
            }
          });
        }
      }
      exports.OidcClient = OidcClient;
      //# sourceMappingURL=oidc-utils.js.map

      /***/
    },

    /***/ 327: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.summary =
        exports.markdownSummary =
        exports.SUMMARY_DOCS_URL =
        exports.SUMMARY_ENV_VAR =
          void 0;
      const os_1 = __nccwpck_require__(37);
      const fs_1 = __nccwpck_require__(147);
      const {access, appendFile, writeFile} = fs_1.promises;
      exports.SUMMARY_ENV_VAR = 'GITHUB_STEP_SUMMARY';
      exports.SUMMARY_DOCS_URL =
        'https://docs.github.com/actions/using-workflows/workflow-commands-for-github-actions#adding-a-job-summary';
      class Summary {
        constructor() {
          this._buffer = '';
        }
        /**
         * Finds the summary file path from the environment, rejects if env var is not found or file does not exist
         * Also checks r/w permissions.
         *
         * @returns step summary file path
         */
        filePath() {
          return __awaiter(this, void 0, void 0, function* () {
            if (this._filePath) {
              return this._filePath;
            }
            const pathFromEnv = process.env[exports.SUMMARY_ENV_VAR];
            if (!pathFromEnv) {
              throw new Error(
                `Unable to find environment variable for $${exports.SUMMARY_ENV_VAR}. Check if your runtime environment supports job summaries.`
              );
            }
            try {
              yield access(
                pathFromEnv,
                fs_1.constants.R_OK | fs_1.constants.W_OK
              );
            } catch (_a) {
              throw new Error(
                `Unable to access summary file: '${pathFromEnv}'. Check if the file has correct read/write permissions.`
              );
            }
            this._filePath = pathFromEnv;
            return this._filePath;
          });
        }
        /**
         * Wraps content in an HTML tag, adding any HTML attributes
         *
         * @param {string} tag HTML tag to wrap
         * @param {string | null} content content within the tag
         * @param {[attribute: string]: string} attrs key-value list of HTML attributes to add
         *
         * @returns {string} content wrapped in HTML element
         */
        wrap(tag, content, attrs = {}) {
          const htmlAttrs = Object.entries(attrs)
            .map(([key, value]) => ` ${key}="${value}"`)
            .join('');
          if (!content) {
            return `<${tag}${htmlAttrs}>`;
          }
          return `<${tag}${htmlAttrs}>${content}</${tag}>`;
        }
        /**
         * Writes text in the buffer to the summary buffer file and empties buffer. Will append by default.
         *
         * @param {SummaryWriteOptions} [options] (optional) options for write operation
         *
         * @returns {Promise<Summary>} summary instance
         */
        write(options) {
          return __awaiter(this, void 0, void 0, function* () {
            const overwrite = !!(options === null || options === void 0
              ? void 0
              : options.overwrite);
            const filePath = yield this.filePath();
            const writeFunc = overwrite ? writeFile : appendFile;
            yield writeFunc(filePath, this._buffer, {encoding: 'utf8'});
            return this.emptyBuffer();
          });
        }
        /**
         * Clears the summary buffer and wipes the summary file
         *
         * @returns {Summary} summary instance
         */
        clear() {
          return __awaiter(this, void 0, void 0, function* () {
            return this.emptyBuffer().write({overwrite: true});
          });
        }
        /**
         * Returns the current summary buffer as a string
         *
         * @returns {string} string of summary buffer
         */
        stringify() {
          return this._buffer;
        }
        /**
         * If the summary buffer is empty
         *
         * @returns {boolen} true if the buffer is empty
         */
        isEmptyBuffer() {
          return this._buffer.length === 0;
        }
        /**
         * Resets the summary buffer without writing to summary file
         *
         * @returns {Summary} summary instance
         */
        emptyBuffer() {
          this._buffer = '';
          return this;
        }
        /**
         * Adds raw text to the summary buffer
         *
         * @param {string} text content to add
         * @param {boolean} [addEOL=false] (optional) append an EOL to the raw text (default: false)
         *
         * @returns {Summary} summary instance
         */
        addRaw(text, addEOL = false) {
          this._buffer += text;
          return addEOL ? this.addEOL() : this;
        }
        /**
         * Adds the operating system-specific end-of-line marker to the buffer
         *
         * @returns {Summary} summary instance
         */
        addEOL() {
          return this.addRaw(os_1.EOL);
        }
        /**
         * Adds an HTML codeblock to the summary buffer
         *
         * @param {string} code content to render within fenced code block
         * @param {string} lang (optional) language to syntax highlight code
         *
         * @returns {Summary} summary instance
         */
        addCodeBlock(code, lang) {
          const attrs = Object.assign({}, lang && {lang});
          const element = this.wrap('pre', this.wrap('code', code), attrs);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML list to the summary buffer
         *
         * @param {string[]} items list of items to render
         * @param {boolean} [ordered=false] (optional) if the rendered list should be ordered or not (default: false)
         *
         * @returns {Summary} summary instance
         */
        addList(items, ordered = false) {
          const tag = ordered ? 'ol' : 'ul';
          const listItems = items.map((item) => this.wrap('li', item)).join('');
          const element = this.wrap(tag, listItems);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML table to the summary buffer
         *
         * @param {SummaryTableCell[]} rows table rows
         *
         * @returns {Summary} summary instance
         */
        addTable(rows) {
          const tableBody = rows
            .map((row) => {
              const cells = row
                .map((cell) => {
                  if (typeof cell === 'string') {
                    return this.wrap('td', cell);
                  }
                  const {header, data, colspan, rowspan} = cell;
                  const tag = header ? 'th' : 'td';
                  const attrs = Object.assign(
                    Object.assign({}, colspan && {colspan}),
                    rowspan && {rowspan}
                  );
                  return this.wrap(tag, data, attrs);
                })
                .join('');
              return this.wrap('tr', cells);
            })
            .join('');
          const element = this.wrap('table', tableBody);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds a collapsable HTML details element to the summary buffer
         *
         * @param {string} label text for the closed state
         * @param {string} content collapsable content
         *
         * @returns {Summary} summary instance
         */
        addDetails(label, content) {
          const element = this.wrap(
            'details',
            this.wrap('summary', label) + content
          );
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML image tag to the summary buffer
         *
         * @param {string} src path to the image you to embed
         * @param {string} alt text description of the image
         * @param {SummaryImageOptions} options (optional) addition image attributes
         *
         * @returns {Summary} summary instance
         */
        addImage(src, alt, options) {
          const {width, height} = options || {};
          const attrs = Object.assign(
            Object.assign({}, width && {width}),
            height && {height}
          );
          const element = this.wrap(
            'img',
            null,
            Object.assign({src, alt}, attrs)
          );
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML section heading element
         *
         * @param {string} text heading text
         * @param {number | string} [level=1] (optional) the heading level, default: 1
         *
         * @returns {Summary} summary instance
         */
        addHeading(text, level) {
          const tag = `h${level}`;
          const allowedTag = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)
            ? tag
            : 'h1';
          const element = this.wrap(allowedTag, text);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML thematic break (<hr>) to the summary buffer
         *
         * @returns {Summary} summary instance
         */
        addSeparator() {
          const element = this.wrap('hr', null);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML line break (<br>) to the summary buffer
         *
         * @returns {Summary} summary instance
         */
        addBreak() {
          const element = this.wrap('br', null);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML blockquote to the summary buffer
         *
         * @param {string} text quote text
         * @param {string} cite (optional) citation url
         *
         * @returns {Summary} summary instance
         */
        addQuote(text, cite) {
          const attrs = Object.assign({}, cite && {cite});
          const element = this.wrap('blockquote', text, attrs);
          return this.addRaw(element).addEOL();
        }
        /**
         * Adds an HTML anchor tag to the summary buffer
         *
         * @param {string} text link text/content
         * @param {string} href hyperlink
         *
         * @returns {Summary} summary instance
         */
        addLink(text, href) {
          const element = this.wrap('a', text, {href});
          return this.addRaw(element).addEOL();
        }
      }
      const _summary = new Summary();
      /**
       * @deprecated use `core.summary`
       */
      exports.markdownSummary = _summary;
      exports.summary = _summary;
      //# sourceMappingURL=summary.js.map

      /***/
    },

    /***/ 278: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      // We use any as a valid input type
      /* eslint-disable @typescript-eslint/no-explicit-any */
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.toCommandProperties = exports.toCommandValue = void 0;
      /**
       * Sanitizes an input into a string so it can be passed into issueCommand safely
       * @param input input to sanitize into a string
       */
      function toCommandValue(input) {
        if (input === null || input === undefined) {
          return '';
        } else if (typeof input === 'string' || input instanceof String) {
          return input;
        }
        return JSON.stringify(input);
      }
      exports.toCommandValue = toCommandValue;
      /**
       *
       * @param annotationProperties
       * @returns The command properties to send with the actual annotation command
       * See IssueCommandProperties: https://github.com/actions/runner/blob/main/src/Runner.Worker/ActionCommandManager.cs#L646
       */
      function toCommandProperties(annotationProperties) {
        if (!Object.keys(annotationProperties).length) {
          return {};
        }
        return {
          title: annotationProperties.title,
          file: annotationProperties.file,
          line: annotationProperties.startLine,
          endLine: annotationProperties.endLine,
          col: annotationProperties.startColumn,
          endColumn: annotationProperties.endColumn,
        };
      }
      exports.toCommandProperties = toCommandProperties;
      //# sourceMappingURL=utils.js.map

      /***/
    },

    /***/ 514: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.getExecOutput = exports.exec = void 0;
      const string_decoder_1 = __nccwpck_require__(576);
      const tr = __importStar(__nccwpck_require__(159));
      /**
       * Exec a command.
       * Output will be streamed to the live console.
       * Returns promise with return code
       *
       * @param     commandLine        command to execute (can include additional args). Must be correctly escaped.
       * @param     args               optional arguments for tool. Escaping is handled by the lib.
       * @param     options            optional exec options.  See ExecOptions
       * @returns   Promise<number>    exit code
       */
      function exec(commandLine, args, options) {
        return __awaiter(this, void 0, void 0, function* () {
          const commandArgs = tr.argStringToArray(commandLine);
          if (commandArgs.length === 0) {
            throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
          }
          // Path to tool to execute should be first arg
          const toolPath = commandArgs[0];
          args = commandArgs.slice(1).concat(args || []);
          const runner = new tr.ToolRunner(toolPath, args, options);
          return runner.exec();
        });
      }
      exports.exec = exec;
      /**
       * Exec a command and get the output.
       * Output will be streamed to the live console.
       * Returns promise with the exit code and collected stdout and stderr
       *
       * @param     commandLine           command to execute (can include additional args). Must be correctly escaped.
       * @param     args                  optional arguments for tool. Escaping is handled by the lib.
       * @param     options               optional exec options.  See ExecOptions
       * @returns   Promise<ExecOutput>   exit code, stdout, and stderr
       */
      function getExecOutput(commandLine, args, options) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
          let stdout = '';
          let stderr = '';
          //Using string decoder covers the case where a mult-byte character is split
          const stdoutDecoder = new string_decoder_1.StringDecoder('utf8');
          const stderrDecoder = new string_decoder_1.StringDecoder('utf8');
          const originalStdoutListener =
            (_a =
              options === null || options === void 0
                ? void 0
                : options.listeners) === null || _a === void 0
              ? void 0
              : _a.stdout;
          const originalStdErrListener =
            (_b =
              options === null || options === void 0
                ? void 0
                : options.listeners) === null || _b === void 0
              ? void 0
              : _b.stderr;
          const stdErrListener = (data) => {
            stderr += stderrDecoder.write(data);
            if (originalStdErrListener) {
              originalStdErrListener(data);
            }
          };
          const stdOutListener = (data) => {
            stdout += stdoutDecoder.write(data);
            if (originalStdoutListener) {
              originalStdoutListener(data);
            }
          };
          const listeners = Object.assign(
            Object.assign(
              {},
              options === null || options === void 0
                ? void 0
                : options.listeners
            ),
            {stdout: stdOutListener, stderr: stdErrListener}
          );
          const exitCode = yield exec(
            commandLine,
            args,
            Object.assign(Object.assign({}, options), {listeners})
          );
          //flush any remaining characters
          stdout += stdoutDecoder.end();
          stderr += stderrDecoder.end();
          return {
            exitCode,
            stdout,
            stderr,
          };
        });
      }
      exports.getExecOutput = getExecOutput;
      //# sourceMappingURL=exec.js.map

      /***/
    },

    /***/ 159: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.argStringToArray = exports.ToolRunner = void 0;
      const os = __importStar(__nccwpck_require__(37));
      const events = __importStar(__nccwpck_require__(361));
      const child = __importStar(__nccwpck_require__(81));
      const path = __importStar(__nccwpck_require__(17));
      const io = __importStar(__nccwpck_require__(436));
      const ioUtil = __importStar(__nccwpck_require__(962));
      const timers_1 = __nccwpck_require__(512);
      /* eslint-disable @typescript-eslint/unbound-method */
      const IS_WINDOWS = process.platform === 'win32';
      /*
       * Class for running command line tools. Handles quoting and arg parsing in a platform agnostic way.
       */
      class ToolRunner extends events.EventEmitter {
        constructor(toolPath, args, options) {
          super();
          if (!toolPath) {
            throw new Error("Parameter 'toolPath' cannot be null or empty.");
          }
          this.toolPath = toolPath;
          this.args = args || [];
          this.options = options || {};
        }
        _debug(message) {
          if (this.options.listeners && this.options.listeners.debug) {
            this.options.listeners.debug(message);
          }
        }
        _getCommandString(options, noPrefix) {
          const toolPath = this._getSpawnFileName();
          const args = this._getSpawnArgs(options);
          let cmd = noPrefix ? '' : '[command]'; // omit prefix when piped to a second tool
          if (IS_WINDOWS) {
            // Windows + cmd file
            if (this._isCmdFile()) {
              cmd += toolPath;
              for (const a of args) {
                cmd += ` ${a}`;
              }
            }
            // Windows + verbatim
            else if (options.windowsVerbatimArguments) {
              cmd += `"${toolPath}"`;
              for (const a of args) {
                cmd += ` ${a}`;
              }
            }
            // Windows (regular)
            else {
              cmd += this._windowsQuoteCmdArg(toolPath);
              for (const a of args) {
                cmd += ` ${this._windowsQuoteCmdArg(a)}`;
              }
            }
          } else {
            // OSX/Linux - this can likely be improved with some form of quoting.
            // creating processes on Unix is fundamentally different than Windows.
            // on Unix, execvp() takes an arg array.
            cmd += toolPath;
            for (const a of args) {
              cmd += ` ${a}`;
            }
          }
          return cmd;
        }
        _processLineBuffer(data, strBuffer, onLine) {
          try {
            let s = strBuffer + data.toString();
            let n = s.indexOf(os.EOL);
            while (n > -1) {
              const line = s.substring(0, n);
              onLine(line);
              // the rest of the string ...
              s = s.substring(n + os.EOL.length);
              n = s.indexOf(os.EOL);
            }
            return s;
          } catch (err) {
            // streaming lines to console is best effort.  Don't fail a build.
            this._debug(`error processing line. Failed with error ${err}`);
            return '';
          }
        }
        _getSpawnFileName() {
          if (IS_WINDOWS) {
            if (this._isCmdFile()) {
              return process.env['COMSPEC'] || 'cmd.exe';
            }
          }
          return this.toolPath;
        }
        _getSpawnArgs(options) {
          if (IS_WINDOWS) {
            if (this._isCmdFile()) {
              let argline = `/D /S /C "${this._windowsQuoteCmdArg(
                this.toolPath
              )}`;
              for (const a of this.args) {
                argline += ' ';
                argline += options.windowsVerbatimArguments
                  ? a
                  : this._windowsQuoteCmdArg(a);
              }
              argline += '"';
              return [argline];
            }
          }
          return this.args;
        }
        _endsWith(str, end) {
          return str.endsWith(end);
        }
        _isCmdFile() {
          const upperToolPath = this.toolPath.toUpperCase();
          return (
            this._endsWith(upperToolPath, '.CMD') ||
            this._endsWith(upperToolPath, '.BAT')
          );
        }
        _windowsQuoteCmdArg(arg) {
          // for .exe, apply the normal quoting rules that libuv applies
          if (!this._isCmdFile()) {
            return this._uvQuoteCmdArg(arg);
          }
          // otherwise apply quoting rules specific to the cmd.exe command line parser.
          // the libuv rules are generic and are not designed specifically for cmd.exe
          // command line parser.
          //
          // for a detailed description of the cmd.exe command line parser, refer to
          // http://stackoverflow.com/questions/4094699/how-does-the-windows-command-interpreter-cmd-exe-parse-scripts/7970912#7970912
          // need quotes for empty arg
          if (!arg) {
            return '""';
          }
          // determine whether the arg needs to be quoted
          const cmdSpecialChars = [
            ' ',
            '\t',
            '&',
            '(',
            ')',
            '[',
            ']',
            '{',
            '}',
            '^',
            '=',
            ';',
            '!',
            "'",
            '+',
            ',',
            '`',
            '~',
            '|',
            '<',
            '>',
            '"',
          ];
          let needsQuotes = false;
          for (const char of arg) {
            if (cmdSpecialChars.some((x) => x === char)) {
              needsQuotes = true;
              break;
            }
          }
          // short-circuit if quotes not needed
          if (!needsQuotes) {
            return arg;
          }
          // the following quoting rules are very similar to the rules that by libuv applies.
          //
          // 1) wrap the string in quotes
          //
          // 2) double-up quotes - i.e. " => ""
          //
          //    this is different from the libuv quoting rules. libuv replaces " with \", which unfortunately
          //    doesn't work well with a cmd.exe command line.
          //
          //    note, replacing " with "" also works well if the arg is passed to a downstream .NET console app.
          //    for example, the command line:
          //          foo.exe "myarg:""my val"""
          //    is parsed by a .NET console app into an arg array:
          //          [ "myarg:\"my val\"" ]
          //    which is the same end result when applying libuv quoting rules. although the actual
          //    command line from libuv quoting rules would look like:
          //          foo.exe "myarg:\"my val\""
          //
          // 3) double-up slashes that precede a quote,
          //    e.g.  hello \world    => "hello \world"
          //          hello\"world    => "hello\\""world"
          //          hello\\"world   => "hello\\\\""world"
          //          hello world\    => "hello world\\"
          //
          //    technically this is not required for a cmd.exe command line, or the batch argument parser.
          //    the reasons for including this as a .cmd quoting rule are:
          //
          //    a) this is optimized for the scenario where the argument is passed from the .cmd file to an
          //       external program. many programs (e.g. .NET console apps) rely on the slash-doubling rule.
          //
          //    b) it's what we've been doing previously (by deferring to node default behavior) and we
          //       haven't heard any complaints about that aspect.
          //
          // note, a weakness of the quoting rules chosen here, is that % is not escaped. in fact, % cannot be
          // escaped when used on the command line directly - even though within a .cmd file % can be escaped
          // by using %%.
          //
          // the saving grace is, on the command line, %var% is left as-is if var is not defined. this contrasts
          // the line parsing rules within a .cmd file, where if var is not defined it is replaced with nothing.
          //
          // one option that was explored was replacing % with ^% - i.e. %var% => ^%var^%. this hack would
          // often work, since it is unlikely that var^ would exist, and the ^ character is removed when the
          // variable is used. the problem, however, is that ^ is not removed when %* is used to pass the args
          // to an external program.
          //
          // an unexplored potential solution for the % escaping problem, is to create a wrapper .cmd file.
          // % can be escaped within a .cmd file.
          let reverse = '"';
          let quoteHit = true;
          for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
              reverse += '\\'; // double the slash
            } else if (arg[i - 1] === '"') {
              quoteHit = true;
              reverse += '"'; // double the quote
            } else {
              quoteHit = false;
            }
          }
          reverse += '"';
          return reverse.split('').reverse().join('');
        }
        _uvQuoteCmdArg(arg) {
          // Tool runner wraps child_process.spawn() and needs to apply the same quoting as
          // Node in certain cases where the undocumented spawn option windowsVerbatimArguments
          // is used.
          //
          // Since this function is a port of quote_cmd_arg from Node 4.x (technically, lib UV,
          // see https://github.com/nodejs/node/blob/v4.x/deps/uv/src/win/process.c for details),
          // pasting copyright notice from Node within this function:
          //
          //      Copyright Joyent, Inc. and other Node contributors. All rights reserved.
          //
          //      Permission is hereby granted, free of charge, to any person obtaining a copy
          //      of this software and associated documentation files (the "Software"), to
          //      deal in the Software without restriction, including without limitation the
          //      rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
          //      sell copies of the Software, and to permit persons to whom the Software is
          //      furnished to do so, subject to the following conditions:
          //
          //      The above copyright notice and this permission notice shall be included in
          //      all copies or substantial portions of the Software.
          //
          //      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
          //      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
          //      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
          //      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
          //      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
          //      FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
          //      IN THE SOFTWARE.
          if (!arg) {
            // Need double quotation for empty argument
            return '""';
          }
          if (!arg.includes(' ') && !arg.includes('\t') && !arg.includes('"')) {
            // No quotation needed
            return arg;
          }
          if (!arg.includes('"') && !arg.includes('\\')) {
            // No embedded double quotes or backslashes, so I can just wrap
            // quote marks around the whole thing.
            return `"${arg}"`;
          }
          // Expected input/output:
          //   input : hello"world
          //   output: "hello\"world"
          //   input : hello""world
          //   output: "hello\"\"world"
          //   input : hello\world
          //   output: hello\world
          //   input : hello\\world
          //   output: hello\\world
          //   input : hello\"world
          //   output: "hello\\\"world"
          //   input : hello\\"world
          //   output: "hello\\\\\"world"
          //   input : hello world\
          //   output: "hello world\\" - note the comment in libuv actually reads "hello world\"
          //                             but it appears the comment is wrong, it should be "hello world\\"
          let reverse = '"';
          let quoteHit = true;
          for (let i = arg.length; i > 0; i--) {
            // walk the string in reverse
            reverse += arg[i - 1];
            if (quoteHit && arg[i - 1] === '\\') {
              reverse += '\\';
            } else if (arg[i - 1] === '"') {
              quoteHit = true;
              reverse += '\\';
            } else {
              quoteHit = false;
            }
          }
          reverse += '"';
          return reverse.split('').reverse().join('');
        }
        _cloneExecOptions(options) {
          options = options || {};
          const result = {
            cwd: options.cwd || process.cwd(),
            env: options.env || process.env,
            silent: options.silent || false,
            windowsVerbatimArguments: options.windowsVerbatimArguments || false,
            failOnStdErr: options.failOnStdErr || false,
            ignoreReturnCode: options.ignoreReturnCode || false,
            delay: options.delay || 10000,
          };
          result.outStream = options.outStream || process.stdout;
          result.errStream = options.errStream || process.stderr;
          return result;
        }
        _getSpawnOptions(options, toolPath) {
          options = options || {};
          const result = {};
          result.cwd = options.cwd;
          result.env = options.env;
          result['windowsVerbatimArguments'] =
            options.windowsVerbatimArguments || this._isCmdFile();
          if (options.windowsVerbatimArguments) {
            result.argv0 = `"${toolPath}"`;
          }
          return result;
        }
        /**
         * Exec a tool.
         * Output will be streamed to the live console.
         * Returns promise with return code
         *
         * @param     tool     path to tool to exec
         * @param     options  optional exec options.  See ExecOptions
         * @returns   number
         */
        exec() {
          return __awaiter(this, void 0, void 0, function* () {
            // root the tool path if it is unrooted and contains relative pathing
            if (
              !ioUtil.isRooted(this.toolPath) &&
              (this.toolPath.includes('/') ||
                (IS_WINDOWS && this.toolPath.includes('\\')))
            ) {
              // prefer options.cwd if it is specified, however options.cwd may also need to be rooted
              this.toolPath = path.resolve(
                process.cwd(),
                this.options.cwd || process.cwd(),
                this.toolPath
              );
            }
            // if the tool is only a file name, then resolve it from the PATH
            // otherwise verify it exists (add extension on Windows if necessary)
            this.toolPath = yield io.which(this.toolPath, true);
            return new Promise((resolve, reject) =>
              __awaiter(this, void 0, void 0, function* () {
                this._debug(`exec tool: ${this.toolPath}`);
                this._debug('arguments:');
                for (const arg of this.args) {
                  this._debug(`   ${arg}`);
                }
                const optionsNonNull = this._cloneExecOptions(this.options);
                if (!optionsNonNull.silent && optionsNonNull.outStream) {
                  optionsNonNull.outStream.write(
                    this._getCommandString(optionsNonNull) + os.EOL
                  );
                }
                const state = new ExecState(optionsNonNull, this.toolPath);
                state.on('debug', (message) => {
                  this._debug(message);
                });
                if (
                  this.options.cwd &&
                  !(yield ioUtil.exists(this.options.cwd))
                ) {
                  return reject(
                    new Error(`The cwd: ${this.options.cwd} does not exist!`)
                  );
                }
                const fileName = this._getSpawnFileName();
                const cp = child.spawn(
                  fileName,
                  this._getSpawnArgs(optionsNonNull),
                  this._getSpawnOptions(this.options, fileName)
                );
                let stdbuffer = '';
                if (cp.stdout) {
                  cp.stdout.on('data', (data) => {
                    if (
                      this.options.listeners &&
                      this.options.listeners.stdout
                    ) {
                      this.options.listeners.stdout(data);
                    }
                    if (!optionsNonNull.silent && optionsNonNull.outStream) {
                      optionsNonNull.outStream.write(data);
                    }
                    stdbuffer = this._processLineBuffer(
                      data,
                      stdbuffer,
                      (line) => {
                        if (
                          this.options.listeners &&
                          this.options.listeners.stdline
                        ) {
                          this.options.listeners.stdline(line);
                        }
                      }
                    );
                  });
                }
                let errbuffer = '';
                if (cp.stderr) {
                  cp.stderr.on('data', (data) => {
                    state.processStderr = true;
                    if (
                      this.options.listeners &&
                      this.options.listeners.stderr
                    ) {
                      this.options.listeners.stderr(data);
                    }
                    if (
                      !optionsNonNull.silent &&
                      optionsNonNull.errStream &&
                      optionsNonNull.outStream
                    ) {
                      const s = optionsNonNull.failOnStdErr
                        ? optionsNonNull.errStream
                        : optionsNonNull.outStream;
                      s.write(data);
                    }
                    errbuffer = this._processLineBuffer(
                      data,
                      errbuffer,
                      (line) => {
                        if (
                          this.options.listeners &&
                          this.options.listeners.errline
                        ) {
                          this.options.listeners.errline(line);
                        }
                      }
                    );
                  });
                }
                cp.on('error', (err) => {
                  state.processError = err.message;
                  state.processExited = true;
                  state.processClosed = true;
                  state.CheckComplete();
                });
                cp.on('exit', (code) => {
                  state.processExitCode = code;
                  state.processExited = true;
                  this._debug(
                    `Exit code ${code} received from tool '${this.toolPath}'`
                  );
                  state.CheckComplete();
                });
                cp.on('close', (code) => {
                  state.processExitCode = code;
                  state.processExited = true;
                  state.processClosed = true;
                  this._debug(
                    `STDIO streams have closed for tool '${this.toolPath}'`
                  );
                  state.CheckComplete();
                });
                state.on('done', (error, exitCode) => {
                  if (stdbuffer.length > 0) {
                    this.emit('stdline', stdbuffer);
                  }
                  if (errbuffer.length > 0) {
                    this.emit('errline', errbuffer);
                  }
                  cp.removeAllListeners();
                  if (error) {
                    reject(error);
                  } else {
                    resolve(exitCode);
                  }
                });
                if (this.options.input) {
                  if (!cp.stdin) {
                    throw new Error('child process missing stdin');
                  }
                  cp.stdin.end(this.options.input);
                }
              })
            );
          });
        }
      }
      exports.ToolRunner = ToolRunner;
      /**
       * Convert an arg string to an array of args. Handles escaping
       *
       * @param    argString   string of arguments
       * @returns  string[]    array of arguments
       */
      function argStringToArray(argString) {
        const args = [];
        let inQuotes = false;
        let escaped = false;
        let arg = '';
        function append(c) {
          // we only escape double quotes.
          if (escaped && c !== '"') {
            arg += '\\';
          }
          arg += c;
          escaped = false;
        }
        for (let i = 0; i < argString.length; i++) {
          const c = argString.charAt(i);
          if (c === '"') {
            if (!escaped) {
              inQuotes = !inQuotes;
            } else {
              append(c);
            }
            continue;
          }
          if (c === '\\' && escaped) {
            append(c);
            continue;
          }
          if (c === '\\' && inQuotes) {
            escaped = true;
            continue;
          }
          if (c === ' ' && !inQuotes) {
            if (arg.length > 0) {
              args.push(arg);
              arg = '';
            }
            continue;
          }
          append(c);
        }
        if (arg.length > 0) {
          args.push(arg.trim());
        }
        return args;
      }
      exports.argStringToArray = argStringToArray;
      class ExecState extends events.EventEmitter {
        constructor(options, toolPath) {
          super();
          this.processClosed = false; // tracks whether the process has exited and stdio is closed
          this.processError = '';
          this.processExitCode = 0;
          this.processExited = false; // tracks whether the process has exited
          this.processStderr = false; // tracks whether stderr was written to
          this.delay = 10000; // 10 seconds
          this.done = false;
          this.timeout = null;
          if (!toolPath) {
            throw new Error('toolPath must not be empty');
          }
          this.options = options;
          this.toolPath = toolPath;
          if (options.delay) {
            this.delay = options.delay;
          }
        }
        CheckComplete() {
          if (this.done) {
            return;
          }
          if (this.processClosed) {
            this._setResult();
          } else if (this.processExited) {
            this.timeout = timers_1.setTimeout(
              ExecState.HandleTimeout,
              this.delay,
              this
            );
          }
        }
        _debug(message) {
          this.emit('debug', message);
        }
        _setResult() {
          // determine whether there is an error
          let error;
          if (this.processExited) {
            if (this.processError) {
              error = new Error(
                `There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`
              );
            } else if (
              this.processExitCode !== 0 &&
              !this.options.ignoreReturnCode
            ) {
              error = new Error(
                `The process '${this.toolPath}' failed with exit code ${this.processExitCode}`
              );
            } else if (this.processStderr && this.options.failOnStdErr) {
              error = new Error(
                `The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`
              );
            }
          }
          // clear the timeout
          if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
          }
          this.done = true;
          this.emit('done', error, this.processExitCode);
        }
        static HandleTimeout(state) {
          if (state.done) {
            return;
          }
          if (!state.processClosed && state.processExited) {
            const message = `The STDIO streams did not close within ${
              state.delay / 1000
            } seconds of the exit event from process '${
              state.toolPath
            }'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
            state._debug(message);
          }
          state._setResult();
        }
      }
      //# sourceMappingURL=toolrunner.js.map

      /***/
    },

    /***/ 526: /***/ function (__unused_webpack_module, exports) {
      'use strict';

      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.PersonalAccessTokenCredentialHandler =
        exports.BearerCredentialHandler =
        exports.BasicCredentialHandler =
          void 0;
      class BasicCredentialHandler {
        constructor(username, password) {
          this.username = username;
          this.password = password;
        }
        prepareRequest(options) {
          if (!options.headers) {
            throw Error('The request has no headers');
          }
          options.headers['Authorization'] = `Basic ${Buffer.from(
            `${this.username}:${this.password}`
          ).toString('base64')}`;
        }
        // This handler cannot handle 401
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
          });
        }
      }
      exports.BasicCredentialHandler = BasicCredentialHandler;
      class BearerCredentialHandler {
        constructor(token) {
          this.token = token;
        }
        // currently implements pre-authorization
        // TODO: support preAuth = false where it hooks on 401
        prepareRequest(options) {
          if (!options.headers) {
            throw Error('The request has no headers');
          }
          options.headers['Authorization'] = `Bearer ${this.token}`;
        }
        // This handler cannot handle 401
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
          });
        }
      }
      exports.BearerCredentialHandler = BearerCredentialHandler;
      class PersonalAccessTokenCredentialHandler {
        constructor(token) {
          this.token = token;
        }
        // currently implements pre-authorization
        // TODO: support preAuth = false where it hooks on 401
        prepareRequest(options) {
          if (!options.headers) {
            throw Error('The request has no headers');
          }
          options.headers['Authorization'] = `Basic ${Buffer.from(
            `PAT:${this.token}`
          ).toString('base64')}`;
        }
        // This handler cannot handle 401
        canHandleAuthentication() {
          return false;
        }
        handleAuthentication() {
          return __awaiter(this, void 0, void 0, function* () {
            throw new Error('not implemented');
          });
        }
      }
      exports.PersonalAccessTokenCredentialHandler =
        PersonalAccessTokenCredentialHandler;
      //# sourceMappingURL=auth.js.map

      /***/
    },

    /***/ 255: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      /* eslint-disable @typescript-eslint/no-explicit-any */
      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.HttpClient =
        exports.isHttps =
        exports.HttpClientResponse =
        exports.HttpClientError =
        exports.getProxyUrl =
        exports.MediaTypes =
        exports.Headers =
        exports.HttpCodes =
          void 0;
      const http = __importStar(__nccwpck_require__(685));
      const https = __importStar(__nccwpck_require__(687));
      const pm = __importStar(__nccwpck_require__(835));
      const tunnel = __importStar(__nccwpck_require__(294));
      var HttpCodes;
      (function (HttpCodes) {
        HttpCodes[(HttpCodes['OK'] = 200)] = 'OK';
        HttpCodes[(HttpCodes['MultipleChoices'] = 300)] = 'MultipleChoices';
        HttpCodes[(HttpCodes['MovedPermanently'] = 301)] = 'MovedPermanently';
        HttpCodes[(HttpCodes['ResourceMoved'] = 302)] = 'ResourceMoved';
        HttpCodes[(HttpCodes['SeeOther'] = 303)] = 'SeeOther';
        HttpCodes[(HttpCodes['NotModified'] = 304)] = 'NotModified';
        HttpCodes[(HttpCodes['UseProxy'] = 305)] = 'UseProxy';
        HttpCodes[(HttpCodes['SwitchProxy'] = 306)] = 'SwitchProxy';
        HttpCodes[(HttpCodes['TemporaryRedirect'] = 307)] = 'TemporaryRedirect';
        HttpCodes[(HttpCodes['PermanentRedirect'] = 308)] = 'PermanentRedirect';
        HttpCodes[(HttpCodes['BadRequest'] = 400)] = 'BadRequest';
        HttpCodes[(HttpCodes['Unauthorized'] = 401)] = 'Unauthorized';
        HttpCodes[(HttpCodes['PaymentRequired'] = 402)] = 'PaymentRequired';
        HttpCodes[(HttpCodes['Forbidden'] = 403)] = 'Forbidden';
        HttpCodes[(HttpCodes['NotFound'] = 404)] = 'NotFound';
        HttpCodes[(HttpCodes['MethodNotAllowed'] = 405)] = 'MethodNotAllowed';
        HttpCodes[(HttpCodes['NotAcceptable'] = 406)] = 'NotAcceptable';
        HttpCodes[(HttpCodes['ProxyAuthenticationRequired'] = 407)] =
          'ProxyAuthenticationRequired';
        HttpCodes[(HttpCodes['RequestTimeout'] = 408)] = 'RequestTimeout';
        HttpCodes[(HttpCodes['Conflict'] = 409)] = 'Conflict';
        HttpCodes[(HttpCodes['Gone'] = 410)] = 'Gone';
        HttpCodes[(HttpCodes['TooManyRequests'] = 429)] = 'TooManyRequests';
        HttpCodes[(HttpCodes['InternalServerError'] = 500)] =
          'InternalServerError';
        HttpCodes[(HttpCodes['NotImplemented'] = 501)] = 'NotImplemented';
        HttpCodes[(HttpCodes['BadGateway'] = 502)] = 'BadGateway';
        HttpCodes[(HttpCodes['ServiceUnavailable'] = 503)] =
          'ServiceUnavailable';
        HttpCodes[(HttpCodes['GatewayTimeout'] = 504)] = 'GatewayTimeout';
      })((HttpCodes = exports.HttpCodes || (exports.HttpCodes = {})));
      var Headers;
      (function (Headers) {
        Headers['Accept'] = 'accept';
        Headers['ContentType'] = 'content-type';
      })((Headers = exports.Headers || (exports.Headers = {})));
      var MediaTypes;
      (function (MediaTypes) {
        MediaTypes['ApplicationJson'] = 'application/json';
      })((MediaTypes = exports.MediaTypes || (exports.MediaTypes = {})));
      /**
       * Returns the proxy URL, depending upon the supplied url and proxy environment variables.
       * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
       */
      function getProxyUrl(serverUrl) {
        const proxyUrl = pm.getProxyUrl(new URL(serverUrl));
        return proxyUrl ? proxyUrl.href : '';
      }
      exports.getProxyUrl = getProxyUrl;
      const HttpRedirectCodes = [
        HttpCodes.MovedPermanently,
        HttpCodes.ResourceMoved,
        HttpCodes.SeeOther,
        HttpCodes.TemporaryRedirect,
        HttpCodes.PermanentRedirect,
      ];
      const HttpResponseRetryCodes = [
        HttpCodes.BadGateway,
        HttpCodes.ServiceUnavailable,
        HttpCodes.GatewayTimeout,
      ];
      const RetryableHttpVerbs = ['OPTIONS', 'GET', 'DELETE', 'HEAD'];
      const ExponentialBackoffCeiling = 10;
      const ExponentialBackoffTimeSlice = 5;
      class HttpClientError extends Error {
        constructor(message, statusCode) {
          super(message);
          this.name = 'HttpClientError';
          this.statusCode = statusCode;
          Object.setPrototypeOf(this, HttpClientError.prototype);
        }
      }
      exports.HttpClientError = HttpClientError;
      class HttpClientResponse {
        constructor(message) {
          this.message = message;
        }
        readBody() {
          return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) =>
              __awaiter(this, void 0, void 0, function* () {
                let output = Buffer.alloc(0);
                this.message.on('data', (chunk) => {
                  output = Buffer.concat([output, chunk]);
                });
                this.message.on('end', () => {
                  resolve(output.toString());
                });
              })
            );
          });
        }
      }
      exports.HttpClientResponse = HttpClientResponse;
      function isHttps(requestUrl) {
        const parsedUrl = new URL(requestUrl);
        return parsedUrl.protocol === 'https:';
      }
      exports.isHttps = isHttps;
      class HttpClient {
        constructor(userAgent, handlers, requestOptions) {
          this._ignoreSslError = false;
          this._allowRedirects = true;
          this._allowRedirectDowngrade = false;
          this._maxRedirects = 50;
          this._allowRetries = false;
          this._maxRetries = 1;
          this._keepAlive = false;
          this._disposed = false;
          this.userAgent = userAgent;
          this.handlers = handlers || [];
          this.requestOptions = requestOptions;
          if (requestOptions) {
            if (requestOptions.ignoreSslError != null) {
              this._ignoreSslError = requestOptions.ignoreSslError;
            }
            this._socketTimeout = requestOptions.socketTimeout;
            if (requestOptions.allowRedirects != null) {
              this._allowRedirects = requestOptions.allowRedirects;
            }
            if (requestOptions.allowRedirectDowngrade != null) {
              this._allowRedirectDowngrade =
                requestOptions.allowRedirectDowngrade;
            }
            if (requestOptions.maxRedirects != null) {
              this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
            }
            if (requestOptions.keepAlive != null) {
              this._keepAlive = requestOptions.keepAlive;
            }
            if (requestOptions.allowRetries != null) {
              this._allowRetries = requestOptions.allowRetries;
            }
            if (requestOptions.maxRetries != null) {
              this._maxRetries = requestOptions.maxRetries;
            }
          }
        }
        options(requestUrl, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(
              'OPTIONS',
              requestUrl,
              null,
              additionalHeaders || {}
            );
          });
        }
        get(requestUrl, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(
              'GET',
              requestUrl,
              null,
              additionalHeaders || {}
            );
          });
        }
        del(requestUrl, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(
              'DELETE',
              requestUrl,
              null,
              additionalHeaders || {}
            );
          });
        }
        post(requestUrl, data, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(
              'POST',
              requestUrl,
              data,
              additionalHeaders || {}
            );
          });
        }
        patch(requestUrl, data, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(
              'PATCH',
              requestUrl,
              data,
              additionalHeaders || {}
            );
          });
        }
        put(requestUrl, data, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(
              'PUT',
              requestUrl,
              data,
              additionalHeaders || {}
            );
          });
        }
        head(requestUrl, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(
              'HEAD',
              requestUrl,
              null,
              additionalHeaders || {}
            );
          });
        }
        sendStream(verb, requestUrl, stream, additionalHeaders) {
          return __awaiter(this, void 0, void 0, function* () {
            return this.request(verb, requestUrl, stream, additionalHeaders);
          });
        }
        /**
         * Gets a typed object from an endpoint
         * Be aware that not found returns a null.  Other errors (4xx, 5xx) reject the promise
         */
        getJson(requestUrl, additionalHeaders = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            additionalHeaders[Headers.Accept] =
              this._getExistingOrDefaultHeader(
                additionalHeaders,
                Headers.Accept,
                MediaTypes.ApplicationJson
              );
            const res = yield this.get(requestUrl, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
          });
        }
        postJson(requestUrl, obj, additionalHeaders = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] =
              this._getExistingOrDefaultHeader(
                additionalHeaders,
                Headers.Accept,
                MediaTypes.ApplicationJson
              );
            additionalHeaders[Headers.ContentType] =
              this._getExistingOrDefaultHeader(
                additionalHeaders,
                Headers.ContentType,
                MediaTypes.ApplicationJson
              );
            const res = yield this.post(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
          });
        }
        putJson(requestUrl, obj, additionalHeaders = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] =
              this._getExistingOrDefaultHeader(
                additionalHeaders,
                Headers.Accept,
                MediaTypes.ApplicationJson
              );
            additionalHeaders[Headers.ContentType] =
              this._getExistingOrDefaultHeader(
                additionalHeaders,
                Headers.ContentType,
                MediaTypes.ApplicationJson
              );
            const res = yield this.put(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
          });
        }
        patchJson(requestUrl, obj, additionalHeaders = {}) {
          return __awaiter(this, void 0, void 0, function* () {
            const data = JSON.stringify(obj, null, 2);
            additionalHeaders[Headers.Accept] =
              this._getExistingOrDefaultHeader(
                additionalHeaders,
                Headers.Accept,
                MediaTypes.ApplicationJson
              );
            additionalHeaders[Headers.ContentType] =
              this._getExistingOrDefaultHeader(
                additionalHeaders,
                Headers.ContentType,
                MediaTypes.ApplicationJson
              );
            const res = yield this.patch(requestUrl, data, additionalHeaders);
            return this._processResponse(res, this.requestOptions);
          });
        }
        /**
         * Makes a raw http request.
         * All other methods such as get, post, patch, and request ultimately call this.
         * Prefer get, del, post and patch
         */
        request(verb, requestUrl, data, headers) {
          return __awaiter(this, void 0, void 0, function* () {
            if (this._disposed) {
              throw new Error('Client has already been disposed.');
            }
            const parsedUrl = new URL(requestUrl);
            let info = this._prepareRequest(verb, parsedUrl, headers);
            // Only perform retries on reads since writes may not be idempotent.
            const maxTries =
              this._allowRetries && RetryableHttpVerbs.includes(verb)
                ? this._maxRetries + 1
                : 1;
            let numTries = 0;
            let response;
            do {
              response = yield this.requestRaw(info, data);
              // Check if it's an authentication challenge
              if (
                response &&
                response.message &&
                response.message.statusCode === HttpCodes.Unauthorized
              ) {
                let authenticationHandler;
                for (const handler of this.handlers) {
                  if (handler.canHandleAuthentication(response)) {
                    authenticationHandler = handler;
                    break;
                  }
                }
                if (authenticationHandler) {
                  return authenticationHandler.handleAuthentication(
                    this,
                    info,
                    data
                  );
                } else {
                  // We have received an unauthorized response but have no handlers to handle it.
                  // Let the response return to the caller.
                  return response;
                }
              }
              let redirectsRemaining = this._maxRedirects;
              while (
                response.message.statusCode &&
                HttpRedirectCodes.includes(response.message.statusCode) &&
                this._allowRedirects &&
                redirectsRemaining > 0
              ) {
                const redirectUrl = response.message.headers['location'];
                if (!redirectUrl) {
                  // if there's no location to redirect to, we won't
                  break;
                }
                const parsedRedirectUrl = new URL(redirectUrl);
                if (
                  parsedUrl.protocol === 'https:' &&
                  parsedUrl.protocol !== parsedRedirectUrl.protocol &&
                  !this._allowRedirectDowngrade
                ) {
                  throw new Error(
                    'Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.'
                  );
                }
                // we need to finish reading the response before reassigning response
                // which will leak the open socket.
                yield response.readBody();
                // strip authorization header if redirected to a different hostname
                if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
                  for (const header in headers) {
                    // header names are case insensitive
                    if (header.toLowerCase() === 'authorization') {
                      delete headers[header];
                    }
                  }
                }
                // let's make the request with the new redirectUrl
                info = this._prepareRequest(verb, parsedRedirectUrl, headers);
                response = yield this.requestRaw(info, data);
                redirectsRemaining--;
              }
              if (
                !response.message.statusCode ||
                !HttpResponseRetryCodes.includes(response.message.statusCode)
              ) {
                // If not a retry code, return immediately instead of retrying
                return response;
              }
              numTries += 1;
              if (numTries < maxTries) {
                yield response.readBody();
                yield this._performExponentialBackoff(numTries);
              }
            } while (numTries < maxTries);
            return response;
          });
        }
        /**
         * Needs to be called if keepAlive is set to true in request options.
         */
        dispose() {
          if (this._agent) {
            this._agent.destroy();
          }
          this._disposed = true;
        }
        /**
         * Raw request.
         * @param info
         * @param data
         */
        requestRaw(info, data) {
          return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
              function callbackForResult(err, res) {
                if (err) {
                  reject(err);
                } else if (!res) {
                  // If `err` is not passed, then `res` must be passed.
                  reject(new Error('Unknown error'));
                } else {
                  resolve(res);
                }
              }
              this.requestRawWithCallback(info, data, callbackForResult);
            });
          });
        }
        /**
         * Raw request with callback.
         * @param info
         * @param data
         * @param onResult
         */
        requestRawWithCallback(info, data, onResult) {
          if (typeof data === 'string') {
            if (!info.options.headers) {
              info.options.headers = {};
            }
            info.options.headers['Content-Length'] = Buffer.byteLength(
              data,
              'utf8'
            );
          }
          let callbackCalled = false;
          function handleResult(err, res) {
            if (!callbackCalled) {
              callbackCalled = true;
              onResult(err, res);
            }
          }
          const req = info.httpModule.request(info.options, (msg) => {
            const res = new HttpClientResponse(msg);
            handleResult(undefined, res);
          });
          let socket;
          req.on('socket', (sock) => {
            socket = sock;
          });
          // If we ever get disconnected, we want the socket to timeout eventually
          req.setTimeout(this._socketTimeout || 3 * 60000, () => {
            if (socket) {
              socket.end();
            }
            handleResult(new Error(`Request timeout: ${info.options.path}`));
          });
          req.on('error', function (err) {
            // err has statusCode property
            // res should have headers
            handleResult(err);
          });
          if (data && typeof data === 'string') {
            req.write(data, 'utf8');
          }
          if (data && typeof data !== 'string') {
            data.on('close', function () {
              req.end();
            });
            data.pipe(req);
          } else {
            req.end();
          }
        }
        /**
         * Gets an http agent. This function is useful when you need an http agent that handles
         * routing through a proxy server - depending upon the url and proxy environment variables.
         * @param serverUrl  The server URL where the request will be sent. For example, https://api.github.com
         */
        getAgent(serverUrl) {
          const parsedUrl = new URL(serverUrl);
          return this._getAgent(parsedUrl);
        }
        _prepareRequest(method, requestUrl, headers) {
          const info = {};
          info.parsedUrl = requestUrl;
          const usingSsl = info.parsedUrl.protocol === 'https:';
          info.httpModule = usingSsl ? https : http;
          const defaultPort = usingSsl ? 443 : 80;
          info.options = {};
          info.options.host = info.parsedUrl.hostname;
          info.options.port = info.parsedUrl.port
            ? parseInt(info.parsedUrl.port)
            : defaultPort;
          info.options.path =
            (info.parsedUrl.pathname || '') + (info.parsedUrl.search || '');
          info.options.method = method;
          info.options.headers = this._mergeHeaders(headers);
          if (this.userAgent != null) {
            info.options.headers['user-agent'] = this.userAgent;
          }
          info.options.agent = this._getAgent(info.parsedUrl);
          // gives handlers an opportunity to participate
          if (this.handlers) {
            for (const handler of this.handlers) {
              handler.prepareRequest(info.options);
            }
          }
          return info;
        }
        _mergeHeaders(headers) {
          if (this.requestOptions && this.requestOptions.headers) {
            return Object.assign(
              {},
              lowercaseKeys(this.requestOptions.headers),
              lowercaseKeys(headers || {})
            );
          }
          return lowercaseKeys(headers || {});
        }
        _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
          let clientHeader;
          if (this.requestOptions && this.requestOptions.headers) {
            clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
          }
          return additionalHeaders[header] || clientHeader || _default;
        }
        _getAgent(parsedUrl) {
          let agent;
          const proxyUrl = pm.getProxyUrl(parsedUrl);
          const useProxy = proxyUrl && proxyUrl.hostname;
          if (this._keepAlive && useProxy) {
            agent = this._proxyAgent;
          }
          if (this._keepAlive && !useProxy) {
            agent = this._agent;
          }
          // if agent is already assigned use that agent.
          if (agent) {
            return agent;
          }
          const usingSsl = parsedUrl.protocol === 'https:';
          let maxSockets = 100;
          if (this.requestOptions) {
            maxSockets =
              this.requestOptions.maxSockets || http.globalAgent.maxSockets;
          }
          // This is `useProxy` again, but we need to check `proxyURl` directly for TypeScripts's flow analysis.
          if (proxyUrl && proxyUrl.hostname) {
            const agentOptions = {
              maxSockets,
              keepAlive: this._keepAlive,
              proxy: Object.assign(
                Object.assign(
                  {},
                  (proxyUrl.username || proxyUrl.password) && {
                    proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`,
                  }
                ),
                {host: proxyUrl.hostname, port: proxyUrl.port}
              ),
            };
            let tunnelAgent;
            const overHttps = proxyUrl.protocol === 'https:';
            if (usingSsl) {
              tunnelAgent = overHttps
                ? tunnel.httpsOverHttps
                : tunnel.httpsOverHttp;
            } else {
              tunnelAgent = overHttps
                ? tunnel.httpOverHttps
                : tunnel.httpOverHttp;
            }
            agent = tunnelAgent(agentOptions);
            this._proxyAgent = agent;
          }
          // if reusing agent across request and tunneling agent isn't assigned create a new agent
          if (this._keepAlive && !agent) {
            const options = {keepAlive: this._keepAlive, maxSockets};
            agent = usingSsl
              ? new https.Agent(options)
              : new http.Agent(options);
            this._agent = agent;
          }
          // if not using private agent and tunnel agent isn't setup then use global agent
          if (!agent) {
            agent = usingSsl ? https.globalAgent : http.globalAgent;
          }
          if (usingSsl && this._ignoreSslError) {
            // we don't want to set NODE_TLS_REJECT_UNAUTHORIZED=0 since that will affect request for entire process
            // http.RequestOptions doesn't expose a way to modify RequestOptions.agent.options
            // we have to cast it to any and change it directly
            agent.options = Object.assign(agent.options || {}, {
              rejectUnauthorized: false,
            });
          }
          return agent;
        }
        _performExponentialBackoff(retryNumber) {
          return __awaiter(this, void 0, void 0, function* () {
            retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
            const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
            return new Promise((resolve) => setTimeout(() => resolve(), ms));
          });
        }
        _processResponse(res, options) {
          return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) =>
              __awaiter(this, void 0, void 0, function* () {
                const statusCode = res.message.statusCode || 0;
                const response = {
                  statusCode,
                  result: null,
                  headers: {},
                };
                // not found leads to null obj returned
                if (statusCode === HttpCodes.NotFound) {
                  resolve(response);
                }
                // get the result from the body
                function dateTimeDeserializer(key, value) {
                  if (typeof value === 'string') {
                    const a = new Date(value);
                    if (!isNaN(a.valueOf())) {
                      return a;
                    }
                  }
                  return value;
                }
                let obj;
                let contents;
                try {
                  contents = yield res.readBody();
                  if (contents && contents.length > 0) {
                    if (options && options.deserializeDates) {
                      obj = JSON.parse(contents, dateTimeDeserializer);
                    } else {
                      obj = JSON.parse(contents);
                    }
                    response.result = obj;
                  }
                  response.headers = res.message.headers;
                } catch (err) {
                  // Invalid resource (contents not json);  leaving result obj null
                }
                // note that 3xx redirects are handled by the http layer.
                if (statusCode > 299) {
                  let msg;
                  // if exception/error in body, attempt to get better error
                  if (obj && obj.message) {
                    msg = obj.message;
                  } else if (contents && contents.length > 0) {
                    // it may be the case that the exception is in the body message as string
                    msg = contents;
                  } else {
                    msg = `Failed request: (${statusCode})`;
                  }
                  const err = new HttpClientError(msg, statusCode);
                  err.result = response.result;
                  reject(err);
                } else {
                  resolve(response);
                }
              })
            );
          });
        }
      }
      exports.HttpClient = HttpClient;
      const lowercaseKeys = (obj) =>
        Object.keys(obj).reduce(
          (c, k) => ((c[k.toLowerCase()] = obj[k]), c),
          {}
        );
      //# sourceMappingURL=index.js.map

      /***/
    },

    /***/ 835: /***/ (__unused_webpack_module, exports) => {
      'use strict';

      Object.defineProperty(exports, '__esModule', {value: true});
      exports.checkBypass = exports.getProxyUrl = void 0;
      function getProxyUrl(reqUrl) {
        const usingSsl = reqUrl.protocol === 'https:';
        if (checkBypass(reqUrl)) {
          return undefined;
        }
        const proxyVar = (() => {
          if (usingSsl) {
            return process.env['https_proxy'] || process.env['HTTPS_PROXY'];
          } else {
            return process.env['http_proxy'] || process.env['HTTP_PROXY'];
          }
        })();
        if (proxyVar) {
          return new URL(proxyVar);
        } else {
          return undefined;
        }
      }
      exports.getProxyUrl = getProxyUrl;
      function checkBypass(reqUrl) {
        if (!reqUrl.hostname) {
          return false;
        }
        const noProxy =
          process.env['no_proxy'] || process.env['NO_PROXY'] || '';
        if (!noProxy) {
          return false;
        }
        // Determine the request port
        let reqPort;
        if (reqUrl.port) {
          reqPort = Number(reqUrl.port);
        } else if (reqUrl.protocol === 'http:') {
          reqPort = 80;
        } else if (reqUrl.protocol === 'https:') {
          reqPort = 443;
        }
        // Format the request hostname and hostname with port
        const upperReqHosts = [reqUrl.hostname.toUpperCase()];
        if (typeof reqPort === 'number') {
          upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
        }
        // Compare request host against noproxy
        for (const upperNoProxyItem of noProxy
          .split(',')
          .map((x) => x.trim().toUpperCase())
          .filter((x) => x)) {
          if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
            return true;
          }
        }
        return false;
      }
      exports.checkBypass = checkBypass;
      //# sourceMappingURL=proxy.js.map

      /***/
    },

    /***/ 962: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      var _a;
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.getCmdPath =
        exports.tryGetExecutablePath =
        exports.isRooted =
        exports.isDirectory =
        exports.exists =
        exports.IS_WINDOWS =
        exports.unlink =
        exports.symlink =
        exports.stat =
        exports.rmdir =
        exports.rename =
        exports.readlink =
        exports.readdir =
        exports.mkdir =
        exports.lstat =
        exports.copyFile =
        exports.chmod =
          void 0;
      const fs = __importStar(__nccwpck_require__(147));
      const path = __importStar(__nccwpck_require__(17));
      (_a = fs.promises),
        (exports.chmod = _a.chmod),
        (exports.copyFile = _a.copyFile),
        (exports.lstat = _a.lstat),
        (exports.mkdir = _a.mkdir),
        (exports.readdir = _a.readdir),
        (exports.readlink = _a.readlink),
        (exports.rename = _a.rename),
        (exports.rmdir = _a.rmdir),
        (exports.stat = _a.stat),
        (exports.symlink = _a.symlink),
        (exports.unlink = _a.unlink);
      exports.IS_WINDOWS = process.platform === 'win32';
      function exists(fsPath) {
        return __awaiter(this, void 0, void 0, function* () {
          try {
            yield exports.stat(fsPath);
          } catch (err) {
            if (err.code === 'ENOENT') {
              return false;
            }
            throw err;
          }
          return true;
        });
      }
      exports.exists = exists;
      function isDirectory(fsPath, useStat = false) {
        return __awaiter(this, void 0, void 0, function* () {
          const stats = useStat
            ? yield exports.stat(fsPath)
            : yield exports.lstat(fsPath);
          return stats.isDirectory();
        });
      }
      exports.isDirectory = isDirectory;
      /**
       * On OSX/Linux, true if path starts with '/'. On Windows, true for paths like:
       * \, \hello, \\hello\share, C:, and C:\hello (and corresponding alternate separator cases).
       */
      function isRooted(p) {
        p = normalizeSeparators(p);
        if (!p) {
          throw new Error('isRooted() parameter "p" cannot be empty');
        }
        if (exports.IS_WINDOWS) {
          return (
            p.startsWith('\\') || /^[A-Z]:/i.test(p) // e.g. \ or \hello or \\hello
          ); // e.g. C: or C:\hello
        }
        return p.startsWith('/');
      }
      exports.isRooted = isRooted;
      /**
       * Best effort attempt to determine whether a file exists and is executable.
       * @param filePath    file path to check
       * @param extensions  additional file extensions to try
       * @return if file exists and is executable, returns the file path. otherwise empty string.
       */
      function tryGetExecutablePath(filePath, extensions) {
        return __awaiter(this, void 0, void 0, function* () {
          let stats = undefined;
          try {
            // test file exists
            stats = yield exports.stat(filePath);
          } catch (err) {
            if (err.code !== 'ENOENT') {
              // eslint-disable-next-line no-console
              console.log(
                `Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`
              );
            }
          }
          if (stats && stats.isFile()) {
            if (exports.IS_WINDOWS) {
              // on Windows, test for valid extension
              const upperExt = path.extname(filePath).toUpperCase();
              if (
                extensions.some(
                  (validExt) => validExt.toUpperCase() === upperExt
                )
              ) {
                return filePath;
              }
            } else {
              if (isUnixExecutable(stats)) {
                return filePath;
              }
            }
          }
          // try each extension
          const originalFilePath = filePath;
          for (const extension of extensions) {
            filePath = originalFilePath + extension;
            stats = undefined;
            try {
              stats = yield exports.stat(filePath);
            } catch (err) {
              if (err.code !== 'ENOENT') {
                // eslint-disable-next-line no-console
                console.log(
                  `Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`
                );
              }
            }
            if (stats && stats.isFile()) {
              if (exports.IS_WINDOWS) {
                // preserve the case of the actual file (since an extension was appended)
                try {
                  const directory = path.dirname(filePath);
                  const upperName = path.basename(filePath).toUpperCase();
                  for (const actualName of yield exports.readdir(directory)) {
                    if (upperName === actualName.toUpperCase()) {
                      filePath = path.join(directory, actualName);
                      break;
                    }
                  }
                } catch (err) {
                  // eslint-disable-next-line no-console
                  console.log(
                    `Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`
                  );
                }
                return filePath;
              } else {
                if (isUnixExecutable(stats)) {
                  return filePath;
                }
              }
            }
          }
          return '';
        });
      }
      exports.tryGetExecutablePath = tryGetExecutablePath;
      function normalizeSeparators(p) {
        p = p || '';
        if (exports.IS_WINDOWS) {
          // convert slashes on Windows
          p = p.replace(/\//g, '\\');
          // remove redundant slashes
          return p.replace(/\\\\+/g, '\\');
        }
        // remove redundant slashes
        return p.replace(/\/\/+/g, '/');
      }
      // on Mac/Linux, test the execute bit
      //     R   W  X  R  W X R W X
      //   256 128 64 32 16 8 4 2 1
      function isUnixExecutable(stats) {
        return (
          (stats.mode & 1) > 0 ||
          ((stats.mode & 8) > 0 && stats.gid === process.getgid()) ||
          ((stats.mode & 64) > 0 && stats.uid === process.getuid())
        );
      }
      // Get the path of cmd.exe in windows
      function getCmdPath() {
        var _a;
        return (_a = process.env['COMSPEC']) !== null && _a !== void 0
          ? _a
          : `cmd.exe`;
      }
      exports.getCmdPath = getCmdPath;
      //# sourceMappingURL=io-util.js.map

      /***/
    },

    /***/ 436: /***/ function (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) {
      'use strict';

      var __createBinding =
        (this && this.__createBinding) ||
        (Object.create
          ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                enumerable: true,
                get: function () {
                  return m[k];
                },
              });
            }
          : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
            });
      var __setModuleDefault =
        (this && this.__setModuleDefault) ||
        (Object.create
          ? function (o, v) {
              Object.defineProperty(o, 'default', {enumerable: true, value: v});
            }
          : function (o, v) {
              o['default'] = v;
            });
      var __importStar =
        (this && this.__importStar) ||
        function (mod) {
          if (mod && mod.__esModule) return mod;
          var result = {};
          if (mod != null)
            for (var k in mod)
              if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                __createBinding(result, mod, k);
          __setModuleDefault(result, mod);
          return result;
        };
      var __awaiter =
        (this && this.__awaiter) ||
        function (thisArg, _arguments, P, generator) {
          function adopt(value) {
            return value instanceof P
              ? value
              : new P(function (resolve) {
                  resolve(value);
                });
          }
          return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
              try {
                step(generator.next(value));
              } catch (e) {
                reject(e);
              }
            }
            function rejected(value) {
              try {
                step(generator['throw'](value));
              } catch (e) {
                reject(e);
              }
            }
            function step(result) {
              result.done
                ? resolve(result.value)
                : adopt(result.value).then(fulfilled, rejected);
            }
            step(
              (generator = generator.apply(thisArg, _arguments || [])).next()
            );
          });
        };
      Object.defineProperty(exports, '__esModule', {value: true});
      exports.findInPath =
        exports.which =
        exports.mkdirP =
        exports.rmRF =
        exports.mv =
        exports.cp =
          void 0;
      const assert_1 = __nccwpck_require__(491);
      const childProcess = __importStar(__nccwpck_require__(81));
      const path = __importStar(__nccwpck_require__(17));
      const util_1 = __nccwpck_require__(837);
      const ioUtil = __importStar(__nccwpck_require__(962));
      const exec = util_1.promisify(childProcess.exec);
      const execFile = util_1.promisify(childProcess.execFile);
      /**
       * Copies a file or folder.
       * Based off of shelljs - https://github.com/shelljs/shelljs/blob/9237f66c52e5daa40458f94f9565e18e8132f5a6/src/cp.js
       *
       * @param     source    source path
       * @param     dest      destination path
       * @param     options   optional. See CopyOptions.
       */
      function cp(source, dest, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          const {force, recursive, copySourceDirectory} =
            readCopyOptions(options);
          const destStat = (yield ioUtil.exists(dest))
            ? yield ioUtil.stat(dest)
            : null;
          // Dest is an existing file, but not forcing
          if (destStat && destStat.isFile() && !force) {
            return;
          }
          // If dest is an existing directory, should copy inside.
          const newDest =
            destStat && destStat.isDirectory() && copySourceDirectory
              ? path.join(dest, path.basename(source))
              : dest;
          if (!(yield ioUtil.exists(source))) {
            throw new Error(`no such file or directory: ${source}`);
          }
          const sourceStat = yield ioUtil.stat(source);
          if (sourceStat.isDirectory()) {
            if (!recursive) {
              throw new Error(
                `Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`
              );
            } else {
              yield cpDirRecursive(source, newDest, 0, force);
            }
          } else {
            if (path.relative(source, newDest) === '') {
              // a file cannot be copied to itself
              throw new Error(`'${newDest}' and '${source}' are the same file`);
            }
            yield copyFile(source, newDest, force);
          }
        });
      }
      exports.cp = cp;
      /**
       * Moves a path.
       *
       * @param     source    source path
       * @param     dest      destination path
       * @param     options   optional. See MoveOptions.
       */
      function mv(source, dest, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
          if (yield ioUtil.exists(dest)) {
            let destExists = true;
            if (yield ioUtil.isDirectory(dest)) {
              // If dest is directory copy src into dest
              dest = path.join(dest, path.basename(source));
              destExists = yield ioUtil.exists(dest);
            }
            if (destExists) {
              if (options.force == null || options.force) {
                yield rmRF(dest);
              } else {
                throw new Error('Destination already exists');
              }
            }
          }
          yield mkdirP(path.dirname(dest));
          yield ioUtil.rename(source, dest);
        });
      }
      exports.mv = mv;
      /**
       * Remove a path recursively with force
       *
       * @param inputPath path to remove
       */
      function rmRF(inputPath) {
        return __awaiter(this, void 0, void 0, function* () {
          if (ioUtil.IS_WINDOWS) {
            // Node doesn't provide a delete operation, only an unlink function. This means that if the file is being used by another
            // program (e.g. antivirus), it won't be deleted. To address this, we shell out the work to rd/del.
            // Check for invalid characters
            // https://docs.microsoft.com/en-us/windows/win32/fileio/naming-a-file
            if (/[*"<>|]/.test(inputPath)) {
              throw new Error(
                'File path must not contain `*`, `"`, `<`, `>` or `|` on Windows'
              );
            }
            try {
              const cmdPath = ioUtil.getCmdPath();
              if (yield ioUtil.isDirectory(inputPath, true)) {
                yield exec(`${cmdPath} /s /c "rd /s /q "%inputPath%""`, {
                  env: {inputPath},
                });
              } else {
                yield exec(`${cmdPath} /s /c "del /f /a "%inputPath%""`, {
                  env: {inputPath},
                });
              }
            } catch (err) {
              // if you try to delete a file that doesn't exist, desired result is achieved
              // other errors are valid
              if (err.code !== 'ENOENT') throw err;
            }
            // Shelling out fails to remove a symlink folder with missing source, this unlink catches that
            try {
              yield ioUtil.unlink(inputPath);
            } catch (err) {
              // if you try to delete a file that doesn't exist, desired result is achieved
              // other errors are valid
              if (err.code !== 'ENOENT') throw err;
            }
          } else {
            let isDir = false;
            try {
              isDir = yield ioUtil.isDirectory(inputPath);
            } catch (err) {
              // if you try to delete a file that doesn't exist, desired result is achieved
              // other errors are valid
              if (err.code !== 'ENOENT') throw err;
              return;
            }
            if (isDir) {
              yield execFile(`rm`, [`-rf`, `${inputPath}`]);
            } else {
              yield ioUtil.unlink(inputPath);
            }
          }
        });
      }
      exports.rmRF = rmRF;
      /**
       * Make a directory.  Creates the full path with folders in between
       * Will throw if it fails
       *
       * @param   fsPath        path to create
       * @returns Promise<void>
       */
      function mkdirP(fsPath) {
        return __awaiter(this, void 0, void 0, function* () {
          assert_1.ok(fsPath, 'a path argument must be provided');
          yield ioUtil.mkdir(fsPath, {recursive: true});
        });
      }
      exports.mkdirP = mkdirP;
      /**
       * Returns path of a tool had the tool actually been invoked.  Resolves via paths.
       * If you check and the tool does not exist, it will throw.
       *
       * @param     tool              name of the tool
       * @param     check             whether to check if tool exists
       * @returns   Promise<string>   path to tool
       */
      function which(tool, check) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!tool) {
            throw new Error("parameter 'tool' is required");
          }
          // recursive when check=true
          if (check) {
            const result = yield which(tool, false);
            if (!result) {
              if (ioUtil.IS_WINDOWS) {
                throw new Error(
                  `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`
                );
              } else {
                throw new Error(
                  `Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`
                );
              }
            }
            return result;
          }
          const matches = yield findInPath(tool);
          if (matches && matches.length > 0) {
            return matches[0];
          }
          return '';
        });
      }
      exports.which = which;
      /**
       * Returns a list of all occurrences of the given tool on the system path.
       *
       * @returns   Promise<string[]>  the paths of the tool
       */
      function findInPath(tool) {
        return __awaiter(this, void 0, void 0, function* () {
          if (!tool) {
            throw new Error("parameter 'tool' is required");
          }
          // build the list of extensions to try
          const extensions = [];
          if (ioUtil.IS_WINDOWS && process.env['PATHEXT']) {
            for (const extension of process.env['PATHEXT'].split(
              path.delimiter
            )) {
              if (extension) {
                extensions.push(extension);
              }
            }
          }
          // if it's rooted, return it if exists. otherwise return empty.
          if (ioUtil.isRooted(tool)) {
            const filePath = yield ioUtil.tryGetExecutablePath(
              tool,
              extensions
            );
            if (filePath) {
              return [filePath];
            }
            return [];
          }
          // if any path separators, return empty
          if (tool.includes(path.sep)) {
            return [];
          }
          // build the list of directories
          //
          // Note, technically "where" checks the current directory on Windows. From a toolkit perspective,
          // it feels like we should not do this. Checking the current directory seems like more of a use
          // case of a shell, and the which() function exposed by the toolkit should strive for consistency
          // across platforms.
          const directories = [];
          if (process.env.PATH) {
            for (const p of process.env.PATH.split(path.delimiter)) {
              if (p) {
                directories.push(p);
              }
            }
          }
          // find all matches
          const matches = [];
          for (const directory of directories) {
            const filePath = yield ioUtil.tryGetExecutablePath(
              path.join(directory, tool),
              extensions
            );
            if (filePath) {
              matches.push(filePath);
            }
          }
          return matches;
        });
      }
      exports.findInPath = findInPath;
      function readCopyOptions(options) {
        const force = options.force == null ? true : options.force;
        const recursive = Boolean(options.recursive);
        const copySourceDirectory =
          options.copySourceDirectory == null
            ? true
            : Boolean(options.copySourceDirectory);
        return {force, recursive, copySourceDirectory};
      }
      function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
        return __awaiter(this, void 0, void 0, function* () {
          // Ensure there is not a run away recursive copy
          if (currentDepth >= 255) return;
          currentDepth++;
          yield mkdirP(destDir);
          const files = yield ioUtil.readdir(sourceDir);
          for (const fileName of files) {
            const srcFile = `${sourceDir}/${fileName}`;
            const destFile = `${destDir}/${fileName}`;
            const srcFileStat = yield ioUtil.lstat(srcFile);
            if (srcFileStat.isDirectory()) {
              // Recurse
              yield cpDirRecursive(srcFile, destFile, currentDepth, force);
            } else {
              yield copyFile(srcFile, destFile, force);
            }
          }
          // Change the mode for the newly created directory
          yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
        });
      }
      // Buffered file copy
      function copyFile(srcFile, destFile, force) {
        return __awaiter(this, void 0, void 0, function* () {
          if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
            // unlink/re-link it
            try {
              yield ioUtil.lstat(destFile);
              yield ioUtil.unlink(destFile);
            } catch (e) {
              // Try to override file permission
              if (e.code === 'EPERM') {
                yield ioUtil.chmod(destFile, '0666');
                yield ioUtil.unlink(destFile);
              }
              // other errors = it doesn't exist, no work to do
            }
            // Copy over symlink
            const symlinkFull = yield ioUtil.readlink(srcFile);
            yield ioUtil.symlink(
              symlinkFull,
              destFile,
              ioUtil.IS_WINDOWS ? 'junction' : null
            );
          } else if (!(yield ioUtil.exists(destFile)) || force) {
            yield ioUtil.copyFile(srcFile, destFile);
          }
        });
      }
      //# sourceMappingURL=io.js.map

      /***/
    },

    /***/ 734: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';
      /* module decorator */ module = __nccwpck_require__.nmd(module);

      const wrapAnsi16 =
        (fn, offset) =>
        (...args) => {
          const code = fn(...args);
          return `\u001B[${code + offset}m`;
        };

      const wrapAnsi256 =
        (fn, offset) =>
        (...args) => {
          const code = fn(...args);
          return `\u001B[${38 + offset};5;${code}m`;
        };

      const wrapAnsi16m =
        (fn, offset) =>
        (...args) => {
          const rgb = fn(...args);
          return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
        };

      const ansi2ansi = (n) => n;
      const rgb2rgb = (r, g, b) => [r, g, b];

      const setLazyProperty = (object, property, get) => {
        Object.defineProperty(object, property, {
          get: () => {
            const value = get();

            Object.defineProperty(object, property, {
              value,
              enumerable: true,
              configurable: true,
            });

            return value;
          },
          enumerable: true,
          configurable: true,
        });
      };

      /** @type {typeof import('color-convert')} */
      let colorConvert;
      const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
        if (colorConvert === undefined) {
          colorConvert = __nccwpck_require__(931);
        }

        const offset = isBackground ? 10 : 0;
        const styles = {};

        for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
          const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
          if (sourceSpace === targetSpace) {
            styles[name] = wrap(identity, offset);
          } else if (typeof suite === 'object') {
            styles[name] = wrap(suite[targetSpace], offset);
          }
        }

        return styles;
      };

      function assembleStyles() {
        const codes = new Map();
        const styles = {
          modifier: {
            reset: [0, 0],
            // 21 isn't widely supported and 22 does the same thing
            bold: [1, 22],
            dim: [2, 22],
            italic: [3, 23],
            underline: [4, 24],
            inverse: [7, 27],
            hidden: [8, 28],
            strikethrough: [9, 29],
          },
          color: {
            black: [30, 39],
            red: [31, 39],
            green: [32, 39],
            yellow: [33, 39],
            blue: [34, 39],
            magenta: [35, 39],
            cyan: [36, 39],
            white: [37, 39],

            // Bright color
            blackBright: [90, 39],
            redBright: [91, 39],
            greenBright: [92, 39],
            yellowBright: [93, 39],
            blueBright: [94, 39],
            magentaBright: [95, 39],
            cyanBright: [96, 39],
            whiteBright: [97, 39],
          },
          bgColor: {
            bgBlack: [40, 49],
            bgRed: [41, 49],
            bgGreen: [42, 49],
            bgYellow: [43, 49],
            bgBlue: [44, 49],
            bgMagenta: [45, 49],
            bgCyan: [46, 49],
            bgWhite: [47, 49],

            // Bright color
            bgBlackBright: [100, 49],
            bgRedBright: [101, 49],
            bgGreenBright: [102, 49],
            bgYellowBright: [103, 49],
            bgBlueBright: [104, 49],
            bgMagentaBright: [105, 49],
            bgCyanBright: [106, 49],
            bgWhiteBright: [107, 49],
          },
        };

        // Alias bright black as gray (and grey)
        styles.color.gray = styles.color.blackBright;
        styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
        styles.color.grey = styles.color.blackBright;
        styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;

        for (const [groupName, group] of Object.entries(styles)) {
          for (const [styleName, style] of Object.entries(group)) {
            styles[styleName] = {
              open: `\u001B[${style[0]}m`,
              close: `\u001B[${style[1]}m`,
            };

            group[styleName] = styles[styleName];

            codes.set(style[0], style[1]);
          }

          Object.defineProperty(styles, groupName, {
            value: group,
            enumerable: false,
          });
        }

        Object.defineProperty(styles, 'codes', {
          value: codes,
          enumerable: false,
        });

        styles.color.close = '\u001B[39m';
        styles.bgColor.close = '\u001B[49m';

        setLazyProperty(styles.color, 'ansi', () =>
          makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false)
        );
        setLazyProperty(styles.color, 'ansi256', () =>
          makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false)
        );
        setLazyProperty(styles.color, 'ansi16m', () =>
          makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false)
        );
        setLazyProperty(styles.bgColor, 'ansi', () =>
          makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true)
        );
        setLazyProperty(styles.bgColor, 'ansi256', () =>
          makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true)
        );
        setLazyProperty(styles.bgColor, 'ansi16m', () =>
          makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true)
        );

        return styles;
      }

      // Make the export immutable
      Object.defineProperty(module, 'exports', {
        enumerable: true,
        get: assembleStyles,
      });

      /***/
    },

    /***/ 818: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const ansiStyles = __nccwpck_require__(734);
      const {stdout: stdoutColor, stderr: stderrColor} =
        __nccwpck_require__(318);
      const {stringReplaceAll, stringEncaseCRLFWithFirstIndex} =
        __nccwpck_require__(415);

      const {isArray} = Array;

      // `supportsColor.level` ??? `ansiStyles.color[name]` mapping
      const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m'];

      const styles = Object.create(null);

      const applyOptions = (object, options = {}) => {
        if (
          options.level &&
          !(
            Number.isInteger(options.level) &&
            options.level >= 0 &&
            options.level <= 3
          )
        ) {
          throw new Error(
            'The `level` option should be an integer from 0 to 3'
          );
        }

        // Detect level if not set manually
        const colorLevel = stdoutColor ? stdoutColor.level : 0;
        object.level = options.level === undefined ? colorLevel : options.level;
      };

      class ChalkClass {
        constructor(options) {
          // eslint-disable-next-line no-constructor-return
          return chalkFactory(options);
        }
      }

      const chalkFactory = (options) => {
        const chalk = {};
        applyOptions(chalk, options);

        chalk.template = (...arguments_) =>
          chalkTag(chalk.template, ...arguments_);

        Object.setPrototypeOf(chalk, Chalk.prototype);
        Object.setPrototypeOf(chalk.template, chalk);

        chalk.template.constructor = () => {
          throw new Error(
            '`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.'
          );
        };

        chalk.template.Instance = ChalkClass;

        return chalk.template;
      };

      function Chalk(options) {
        return chalkFactory(options);
      }

      for (const [styleName, style] of Object.entries(ansiStyles)) {
        styles[styleName] = {
          get() {
            const builder = createBuilder(
              this,
              createStyler(style.open, style.close, this._styler),
              this._isEmpty
            );
            Object.defineProperty(this, styleName, {value: builder});
            return builder;
          },
        };
      }

      styles.visible = {
        get() {
          const builder = createBuilder(this, this._styler, true);
          Object.defineProperty(this, 'visible', {value: builder});
          return builder;
        },
      };

      const usedModels = [
        'rgb',
        'hex',
        'keyword',
        'hsl',
        'hsv',
        'hwb',
        'ansi',
        'ansi256',
      ];

      for (const model of usedModels) {
        styles[model] = {
          get() {
            const {level} = this;
            return function (...arguments_) {
              const styler = createStyler(
                ansiStyles.color[levelMapping[level]][model](...arguments_),
                ansiStyles.color.close,
                this._styler
              );
              return createBuilder(this, styler, this._isEmpty);
            };
          },
        };
      }

      for (const model of usedModels) {
        const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
        styles[bgModel] = {
          get() {
            const {level} = this;
            return function (...arguments_) {
              const styler = createStyler(
                ansiStyles.bgColor[levelMapping[level]][model](...arguments_),
                ansiStyles.bgColor.close,
                this._styler
              );
              return createBuilder(this, styler, this._isEmpty);
            };
          },
        };
      }

      const proto = Object.defineProperties(() => {}, {
        ...styles,
        level: {
          enumerable: true,
          get() {
            return this._generator.level;
          },
          set(level) {
            this._generator.level = level;
          },
        },
      });

      const createStyler = (open, close, parent) => {
        let openAll;
        let closeAll;
        if (parent === undefined) {
          openAll = open;
          closeAll = close;
        } else {
          openAll = parent.openAll + open;
          closeAll = close + parent.closeAll;
        }

        return {
          open,
          close,
          openAll,
          closeAll,
          parent,
        };
      };

      const createBuilder = (self, _styler, _isEmpty) => {
        const builder = (...arguments_) => {
          if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
            // Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
            return applyStyle(builder, chalkTag(builder, ...arguments_));
          }

          // Single argument is hot path, implicit coercion is faster than anything
          // eslint-disable-next-line no-implicit-coercion
          return applyStyle(
            builder,
            arguments_.length === 1 ? '' + arguments_[0] : arguments_.join(' ')
          );
        };

        // We alter the prototype because we must return a function, but there is
        // no way to create a function with a different prototype
        Object.setPrototypeOf(builder, proto);

        builder._generator = self;
        builder._styler = _styler;
        builder._isEmpty = _isEmpty;

        return builder;
      };

      const applyStyle = (self, string) => {
        if (self.level <= 0 || !string) {
          return self._isEmpty ? '' : string;
        }

        let styler = self._styler;

        if (styler === undefined) {
          return string;
        }

        const {openAll, closeAll} = styler;
        if (string.indexOf('\u001B') !== -1) {
          while (styler !== undefined) {
            // Replace any instances already present with a re-opening code
            // otherwise only the part of the string until said closing code
            // will be colored, and the rest will simply be 'plain'.
            string = stringReplaceAll(string, styler.close, styler.open);

            styler = styler.parent;
          }
        }

        // We can move both next actions out of loop, because remaining actions in loop won't have
        // any/visible effect on parts we add here. Close the styling before a linebreak and reopen
        // after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
        const lfIndex = string.indexOf('\n');
        if (lfIndex !== -1) {
          string = stringEncaseCRLFWithFirstIndex(
            string,
            closeAll,
            openAll,
            lfIndex
          );
        }

        return openAll + string + closeAll;
      };

      let template;
      const chalkTag = (chalk, ...strings) => {
        const [firstString] = strings;

        if (!isArray(firstString) || !isArray(firstString.raw)) {
          // If chalk() was called by itself or with a string,
          // return the string itself as a string.
          return strings.join(' ');
        }

        const arguments_ = strings.slice(1);
        const parts = [firstString.raw[0]];

        for (let i = 1; i < firstString.length; i++) {
          parts.push(
            String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
            String(firstString.raw[i])
          );
        }

        if (template === undefined) {
          template = __nccwpck_require__(500);
        }

        return template(chalk, parts.join(''));
      };

      Object.defineProperties(Chalk.prototype, styles);

      const chalk = Chalk(); // eslint-disable-line new-cap
      chalk.supportsColor = stdoutColor;
      chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
      chalk.stderr.supportsColor = stderrColor;

      module.exports = chalk;

      /***/
    },

    /***/ 500: /***/ (module) => {
      'use strict';

      const TEMPLATE_REGEX =
        /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
      const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
      const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
      const ESCAPE_REGEX =
        /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;

      const ESCAPES = new Map([
        ['n', '\n'],
        ['r', '\r'],
        ['t', '\t'],
        ['b', '\b'],
        ['f', '\f'],
        ['v', '\v'],
        ['0', '\0'],
        ['\\', '\\'],
        ['e', '\u001B'],
        ['a', '\u0007'],
      ]);

      function unescape(c) {
        const u = c[0] === 'u';
        const bracket = c[1] === '{';

        if (
          (u && !bracket && c.length === 5) ||
          (c[0] === 'x' && c.length === 3)
        ) {
          return String.fromCharCode(parseInt(c.slice(1), 16));
        }

        if (u && bracket) {
          return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
        }

        return ESCAPES.get(c) || c;
      }

      function parseArguments(name, arguments_) {
        const results = [];
        const chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;

        for (const chunk of chunks) {
          const number = Number(chunk);
          if (!Number.isNaN(number)) {
            results.push(number);
          } else if ((matches = chunk.match(STRING_REGEX))) {
            results.push(
              matches[2].replace(ESCAPE_REGEX, (m, escape, character) =>
                escape ? unescape(escape) : character
              )
            );
          } else {
            throw new Error(
              `Invalid Chalk template style argument: ${chunk} (in style '${name}')`
            );
          }
        }

        return results;
      }

      function parseStyle(style) {
        STYLE_REGEX.lastIndex = 0;

        const results = [];
        let matches;

        while ((matches = STYLE_REGEX.exec(style)) !== null) {
          const name = matches[1];

          if (matches[2]) {
            const args = parseArguments(name, matches[2]);
            results.push([name].concat(args));
          } else {
            results.push([name]);
          }
        }

        return results;
      }

      function buildStyle(chalk, styles) {
        const enabled = {};

        for (const layer of styles) {
          for (const style of layer.styles) {
            enabled[style[0]] = layer.inverse ? null : style.slice(1);
          }
        }

        let current = chalk;
        for (const [styleName, styles] of Object.entries(enabled)) {
          if (!Array.isArray(styles)) {
            continue;
          }

          if (!(styleName in current)) {
            throw new Error(`Unknown Chalk style: ${styleName}`);
          }

          current =
            styles.length > 0
              ? current[styleName](...styles)
              : current[styleName];
        }

        return current;
      }

      module.exports = (chalk, temporary) => {
        const styles = [];
        const chunks = [];
        let chunk = [];

        // eslint-disable-next-line max-params
        temporary.replace(
          TEMPLATE_REGEX,
          (m, escapeCharacter, inverse, style, close, character) => {
            if (escapeCharacter) {
              chunk.push(unescape(escapeCharacter));
            } else if (style) {
              const string = chunk.join('');
              chunk = [];
              chunks.push(
                styles.length === 0 ? string : buildStyle(chalk, styles)(string)
              );
              styles.push({inverse, styles: parseStyle(style)});
            } else if (close) {
              if (styles.length === 0) {
                throw new Error('Found extraneous } in Chalk template literal');
              }

              chunks.push(buildStyle(chalk, styles)(chunk.join('')));
              chunk = [];
              styles.pop();
            } else {
              chunk.push(character);
            }
          }
        );

        chunks.push(chunk.join(''));

        if (styles.length > 0) {
          const errMessage = `Chalk template literal is missing ${
            styles.length
          } closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
          throw new Error(errMessage);
        }

        return chunks.join('');
      };

      /***/
    },

    /***/ 415: /***/ (module) => {
      'use strict';

      const stringReplaceAll = (string, substring, replacer) => {
        let index = string.indexOf(substring);
        if (index === -1) {
          return string;
        }

        const substringLength = substring.length;
        let endIndex = 0;
        let returnValue = '';
        do {
          returnValue +=
            string.substr(endIndex, index - endIndex) + substring + replacer;
          endIndex = index + substringLength;
          index = string.indexOf(substring, endIndex);
        } while (index !== -1);

        returnValue += string.substr(endIndex);
        return returnValue;
      };

      const stringEncaseCRLFWithFirstIndex = (
        string,
        prefix,
        postfix,
        index
      ) => {
        let endIndex = 0;
        let returnValue = '';
        do {
          const gotCR = string[index - 1] === '\r';
          returnValue +=
            string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) +
            prefix +
            (gotCR ? '\r\n' : '\n') +
            postfix;
          endIndex = index + 1;
          index = string.indexOf('\n', endIndex);
        } while (index !== -1);

        returnValue += string.substr(endIndex);
        return returnValue;
      };

      module.exports = {
        stringReplaceAll,
        stringEncaseCRLFWithFirstIndex,
      };

      /***/
    },

    /***/ 391: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      /* MIT license */
      /* eslint-disable no-mixed-operators */
      const cssKeywords = __nccwpck_require__(510);

      // NOTE: conversions should only return primitive values (i.e. arrays, or
      //       values that give correct `typeof` results).
      //       do not use box values types (i.e. Number(), String(), etc.)

      const reverseKeywords = {};
      for (const key of Object.keys(cssKeywords)) {
        reverseKeywords[cssKeywords[key]] = key;
      }

      const convert = {
        rgb: {channels: 3, labels: 'rgb'},
        hsl: {channels: 3, labels: 'hsl'},
        hsv: {channels: 3, labels: 'hsv'},
        hwb: {channels: 3, labels: 'hwb'},
        cmyk: {channels: 4, labels: 'cmyk'},
        xyz: {channels: 3, labels: 'xyz'},
        lab: {channels: 3, labels: 'lab'},
        lch: {channels: 3, labels: 'lch'},
        hex: {channels: 1, labels: ['hex']},
        keyword: {channels: 1, labels: ['keyword']},
        ansi16: {channels: 1, labels: ['ansi16']},
        ansi256: {channels: 1, labels: ['ansi256']},
        hcg: {channels: 3, labels: ['h', 'c', 'g']},
        apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
        gray: {channels: 1, labels: ['gray']},
      };

      module.exports = convert;

      // Hide .channels and .labels properties
      for (const model of Object.keys(convert)) {
        if (!('channels' in convert[model])) {
          throw new Error('missing channels property: ' + model);
        }

        if (!('labels' in convert[model])) {
          throw new Error('missing channel labels property: ' + model);
        }

        if (convert[model].labels.length !== convert[model].channels) {
          throw new Error('channel and label counts mismatch: ' + model);
        }

        const {channels, labels} = convert[model];
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], 'channels', {value: channels});
        Object.defineProperty(convert[model], 'labels', {value: labels});
      }

      convert.rgb.hsl = function (rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const delta = max - min;
        let h;
        let s;

        if (max === min) {
          h = 0;
        } else if (r === max) {
          h = (g - b) / delta;
        } else if (g === max) {
          h = 2 + (b - r) / delta;
        } else if (b === max) {
          h = 4 + (r - g) / delta;
        }

        h = Math.min(h * 60, 360);

        if (h < 0) {
          h += 360;
        }

        const l = (min + max) / 2;

        if (max === min) {
          s = 0;
        } else if (l <= 0.5) {
          s = delta / (max + min);
        } else {
          s = delta / (2 - max - min);
        }

        return [h, s * 100, l * 100];
      };

      convert.rgb.hsv = function (rgb) {
        let rdif;
        let gdif;
        let bdif;
        let h;
        let s;

        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const v = Math.max(r, g, b);
        const diff = v - Math.min(r, g, b);
        const diffc = function (c) {
          return (v - c) / 6 / diff + 1 / 2;
        };

        if (diff === 0) {
          h = 0;
          s = 0;
        } else {
          s = diff / v;
          rdif = diffc(r);
          gdif = diffc(g);
          bdif = diffc(b);

          if (r === v) {
            h = bdif - gdif;
          } else if (g === v) {
            h = 1 / 3 + rdif - bdif;
          } else if (b === v) {
            h = 2 / 3 + gdif - rdif;
          }

          if (h < 0) {
            h += 1;
          } else if (h > 1) {
            h -= 1;
          }
        }

        return [h * 360, s * 100, v * 100];
      };

      convert.rgb.hwb = function (rgb) {
        const r = rgb[0];
        const g = rgb[1];
        let b = rgb[2];
        const h = convert.rgb.hsl(rgb)[0];
        const w = (1 / 255) * Math.min(r, Math.min(g, b));

        b = 1 - (1 / 255) * Math.max(r, Math.max(g, b));

        return [h, w * 100, b * 100];
      };

      convert.rgb.cmyk = function (rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;

        const k = Math.min(1 - r, 1 - g, 1 - b);
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g - k) / (1 - k) || 0;
        const y = (1 - b - k) / (1 - k) || 0;

        return [c * 100, m * 100, y * 100, k * 100];
      };

      function comparativeDistance(x, y) {
        /*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
        return (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2;
      }

      convert.rgb.keyword = function (rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) {
          return reversed;
        }

        let currentClosestDistance = Infinity;
        let currentClosestKeyword;

        for (const keyword of Object.keys(cssKeywords)) {
          const value = cssKeywords[keyword];

          // Compute comparative distance
          const distance = comparativeDistance(rgb, value);

          // Check if its less, if so set as closest
          if (distance < currentClosestDistance) {
            currentClosestDistance = distance;
            currentClosestKeyword = keyword;
          }
        }

        return currentClosestKeyword;
      };

      convert.keyword.rgb = function (keyword) {
        return cssKeywords[keyword];
      };

      convert.rgb.xyz = function (rgb) {
        let r = rgb[0] / 255;
        let g = rgb[1] / 255;
        let b = rgb[2] / 255;

        // Assume sRGB
        r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
        g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
        b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

        const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
        const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
        const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

        return [x * 100, y * 100, z * 100];
      };

      convert.rgb.lab = function (rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];

        x /= 95.047;
        y /= 100;
        z /= 108.883;

        x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;

        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);

        return [l, a, b];
      };

      convert.hsl.rgb = function (hsl) {
        const h = hsl[0] / 360;
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        let t2;
        let t3;
        let val;

        if (s === 0) {
          val = l * 255;
          return [val, val, val];
        }

        if (l < 0.5) {
          t2 = l * (1 + s);
        } else {
          t2 = l + s - l * s;
        }

        const t1 = 2 * l - t2;

        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
          t3 = h + (1 / 3) * -(i - 1);
          if (t3 < 0) {
            t3++;
          }

          if (t3 > 1) {
            t3--;
          }

          if (6 * t3 < 1) {
            val = t1 + (t2 - t1) * 6 * t3;
          } else if (2 * t3 < 1) {
            val = t2;
          } else if (3 * t3 < 2) {
            val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
          } else {
            val = t1;
          }

          rgb[i] = val * 255;
        }

        return rgb;
      };

      convert.hsl.hsv = function (hsl) {
        const h = hsl[0];
        let s = hsl[1] / 100;
        let l = hsl[2] / 100;
        let smin = s;
        const lmin = Math.max(l, 0.01);

        l *= 2;
        s *= l <= 1 ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v = (l + s) / 2;
        const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);

        return [h, sv * 100, v * 100];
      };

      convert.hsv.rgb = function (hsv) {
        const h = hsv[0] / 60;
        const s = hsv[1] / 100;
        let v = hsv[2] / 100;
        const hi = Math.floor(h) % 6;

        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - s * f);
        const t = 255 * v * (1 - s * (1 - f));
        v *= 255;

        switch (hi) {
          case 0:
            return [v, t, p];
          case 1:
            return [q, v, p];
          case 2:
            return [p, v, t];
          case 3:
            return [p, q, v];
          case 4:
            return [t, p, v];
          case 5:
            return [v, p, q];
        }
      };

      convert.hsv.hsl = function (hsv) {
        const h = hsv[0];
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const vmin = Math.max(v, 0.01);
        let sl;
        let l;

        l = (2 - s) * v;
        const lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= lmin <= 1 ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;

        return [h, sl * 100, l * 100];
      };

      // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
      convert.hwb.rgb = function (hwb) {
        const h = hwb[0] / 360;
        let wh = hwb[1] / 100;
        let bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f;

        // Wh + bl cant be > 1
        if (ratio > 1) {
          wh /= ratio;
          bl /= ratio;
        }

        const i = Math.floor(6 * h);
        const v = 1 - bl;
        f = 6 * h - i;

        if ((i & 0x01) !== 0) {
          f = 1 - f;
        }

        const n = wh + f * (v - wh); // Linear interpolation

        let r;
        let g;
        let b;
        /* eslint-disable max-statements-per-line,no-multi-spaces */
        switch (i) {
          default:
          case 6:
          case 0:
            r = v;
            g = n;
            b = wh;
            break;
          case 1:
            r = n;
            g = v;
            b = wh;
            break;
          case 2:
            r = wh;
            g = v;
            b = n;
            break;
          case 3:
            r = wh;
            g = n;
            b = v;
            break;
          case 4:
            r = n;
            g = wh;
            b = v;
            break;
          case 5:
            r = v;
            g = wh;
            b = n;
            break;
        }
        /* eslint-enable max-statements-per-line,no-multi-spaces */

        return [r * 255, g * 255, b * 255];
      };

      convert.cmyk.rgb = function (cmyk) {
        const c = cmyk[0] / 100;
        const m = cmyk[1] / 100;
        const y = cmyk[2] / 100;
        const k = cmyk[3] / 100;

        const r = 1 - Math.min(1, c * (1 - k) + k);
        const g = 1 - Math.min(1, m * (1 - k) + k);
        const b = 1 - Math.min(1, y * (1 - k) + k);

        return [r * 255, g * 255, b * 255];
      };

      convert.xyz.rgb = function (xyz) {
        const x = xyz[0] / 100;
        const y = xyz[1] / 100;
        const z = xyz[2] / 100;
        let r;
        let g;
        let b;

        r = x * 3.2406 + y * -1.5372 + z * -0.4986;
        g = x * -0.9689 + y * 1.8758 + z * 0.0415;
        b = x * 0.0557 + y * -0.204 + z * 1.057;

        // Assume sRGB
        r = r > 0.0031308 ? 1.055 * r ** (1.0 / 2.4) - 0.055 : r * 12.92;

        g = g > 0.0031308 ? 1.055 * g ** (1.0 / 2.4) - 0.055 : g * 12.92;

        b = b > 0.0031308 ? 1.055 * b ** (1.0 / 2.4) - 0.055 : b * 12.92;

        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);

        return [r * 255, g * 255, b * 255];
      };

      convert.xyz.lab = function (xyz) {
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];

        x /= 95.047;
        y /= 100;
        z /= 108.883;

        x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
        y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
        z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;

        const l = 116 * y - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);

        return [l, a, b];
      };

      convert.lab.xyz = function (lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let x;
        let y;
        let z;

        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;

        const y2 = y ** 3;
        const x2 = x ** 3;
        const z2 = z ** 3;
        y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;

        x *= 95.047;
        y *= 100;
        z *= 108.883;

        return [x, y, z];
      };

      convert.lab.lch = function (lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let h;

        const hr = Math.atan2(b, a);
        h = (hr * 360) / 2 / Math.PI;

        if (h < 0) {
          h += 360;
        }

        const c = Math.sqrt(a * a + b * b);

        return [l, c, h];
      };

      convert.lch.lab = function (lch) {
        const l = lch[0];
        const c = lch[1];
        const h = lch[2];

        const hr = (h / 360) * 2 * Math.PI;
        const a = c * Math.cos(hr);
        const b = c * Math.sin(hr);

        return [l, a, b];
      };

      convert.rgb.ansi16 = function (args, saturation = null) {
        const [r, g, b] = args;
        let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization

        value = Math.round(value / 50);

        if (value === 0) {
          return 30;
        }

        let ansi =
          30 +
          ((Math.round(b / 255) << 2) |
            (Math.round(g / 255) << 1) |
            Math.round(r / 255));

        if (value === 2) {
          ansi += 60;
        }

        return ansi;
      };

      convert.hsv.ansi16 = function (args) {
        // Optimization here; we already know the value and don't need to get
        // it converted for us.
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
      };

      convert.rgb.ansi256 = function (args) {
        const r = args[0];
        const g = args[1];
        const b = args[2];

        // We use the extended greyscale palette here, with the exception of
        // black and white. normal palette only has 4 greyscale shades.
        if (r === g && g === b) {
          if (r < 8) {
            return 16;
          }

          if (r > 248) {
            return 231;
          }

          return Math.round(((r - 8) / 247) * 24) + 232;
        }

        const ansi =
          16 +
          36 * Math.round((r / 255) * 5) +
          6 * Math.round((g / 255) * 5) +
          Math.round((b / 255) * 5);

        return ansi;
      };

      convert.ansi16.rgb = function (args) {
        let color = args % 10;

        // Handle greyscale
        if (color === 0 || color === 7) {
          if (args > 50) {
            color += 3.5;
          }

          color = (color / 10.5) * 255;

          return [color, color, color];
        }

        const mult = (~~(args > 50) + 1) * 0.5;
        const r = (color & 1) * mult * 255;
        const g = ((color >> 1) & 1) * mult * 255;
        const b = ((color >> 2) & 1) * mult * 255;

        return [r, g, b];
      };

      convert.ansi256.rgb = function (args) {
        // Handle greyscale
        if (args >= 232) {
          const c = (args - 232) * 10 + 8;
          return [c, c, c];
        }

        args -= 16;

        let rem;
        const r = (Math.floor(args / 36) / 5) * 255;
        const g = (Math.floor((rem = args % 36) / 6) / 5) * 255;
        const b = ((rem % 6) / 5) * 255;

        return [r, g, b];
      };

      convert.rgb.hex = function (args) {
        const integer =
          ((Math.round(args[0]) & 0xff) << 16) +
          ((Math.round(args[1]) & 0xff) << 8) +
          (Math.round(args[2]) & 0xff);

        const string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
      };

      convert.hex.rgb = function (args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
          return [0, 0, 0];
        }

        let colorString = match[0];

        if (match[0].length === 3) {
          colorString = colorString
            .split('')
            .map((char) => {
              return char + char;
            })
            .join('');
        }

        const integer = parseInt(colorString, 16);
        const r = (integer >> 16) & 0xff;
        const g = (integer >> 8) & 0xff;
        const b = integer & 0xff;

        return [r, g, b];
      };

      convert.rgb.hcg = function (rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const max = Math.max(Math.max(r, g), b);
        const min = Math.min(Math.min(r, g), b);
        const chroma = max - min;
        let grayscale;
        let hue;

        if (chroma < 1) {
          grayscale = min / (1 - chroma);
        } else {
          grayscale = 0;
        }

        if (chroma <= 0) {
          hue = 0;
        } else if (max === r) {
          hue = ((g - b) / chroma) % 6;
        } else if (max === g) {
          hue = 2 + (b - r) / chroma;
        } else {
          hue = 4 + (r - g) / chroma;
        }

        hue /= 6;
        hue %= 1;

        return [hue * 360, chroma * 100, grayscale * 100];
      };

      convert.hsl.hcg = function (hsl) {
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;

        const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l);

        let f = 0;
        if (c < 1.0) {
          f = (l - 0.5 * c) / (1.0 - c);
        }

        return [hsl[0], c * 100, f * 100];
      };

      convert.hsv.hcg = function (hsv) {
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;

        const c = s * v;
        let f = 0;

        if (c < 1.0) {
          f = (v - c) / (1 - c);
        }

        return [hsv[0], c * 100, f * 100];
      };

      convert.hcg.rgb = function (hcg) {
        const h = hcg[0] / 360;
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;

        if (c === 0.0) {
          return [g * 255, g * 255, g * 255];
        }

        const pure = [0, 0, 0];
        const hi = (h % 1) * 6;
        const v = hi % 1;
        const w = 1 - v;
        let mg = 0;

        /* eslint-disable max-statements-per-line */
        switch (Math.floor(hi)) {
          case 0:
            pure[0] = 1;
            pure[1] = v;
            pure[2] = 0;
            break;
          case 1:
            pure[0] = w;
            pure[1] = 1;
            pure[2] = 0;
            break;
          case 2:
            pure[0] = 0;
            pure[1] = 1;
            pure[2] = v;
            break;
          case 3:
            pure[0] = 0;
            pure[1] = w;
            pure[2] = 1;
            break;
          case 4:
            pure[0] = v;
            pure[1] = 0;
            pure[2] = 1;
            break;
          default:
            pure[0] = 1;
            pure[1] = 0;
            pure[2] = w;
        }
        /* eslint-enable max-statements-per-line */

        mg = (1.0 - c) * g;

        return [
          (c * pure[0] + mg) * 255,
          (c * pure[1] + mg) * 255,
          (c * pure[2] + mg) * 255,
        ];
      };

      convert.hcg.hsv = function (hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;

        const v = c + g * (1.0 - c);
        let f = 0;

        if (v > 0.0) {
          f = c / v;
        }

        return [hcg[0], f * 100, v * 100];
      };

      convert.hcg.hsl = function (hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;

        const l = g * (1.0 - c) + 0.5 * c;
        let s = 0;

        if (l > 0.0 && l < 0.5) {
          s = c / (2 * l);
        } else if (l >= 0.5 && l < 1.0) {
          s = c / (2 * (1 - l));
        }

        return [hcg[0], s * 100, l * 100];
      };

      convert.hcg.hwb = function (hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1.0 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
      };

      convert.hwb.hcg = function (hwb) {
        const w = hwb[1] / 100;
        const b = hwb[2] / 100;
        const v = 1 - b;
        const c = v - w;
        let g = 0;

        if (c < 1) {
          g = (v - c) / (1 - c);
        }

        return [hwb[0], c * 100, g * 100];
      };

      convert.apple.rgb = function (apple) {
        return [
          (apple[0] / 65535) * 255,
          (apple[1] / 65535) * 255,
          (apple[2] / 65535) * 255,
        ];
      };

      convert.rgb.apple = function (rgb) {
        return [
          (rgb[0] / 255) * 65535,
          (rgb[1] / 255) * 65535,
          (rgb[2] / 255) * 65535,
        ];
      };

      convert.gray.rgb = function (args) {
        return [
          (args[0] / 100) * 255,
          (args[0] / 100) * 255,
          (args[0] / 100) * 255,
        ];
      };

      convert.gray.hsl = function (args) {
        return [0, 0, args[0]];
      };

      convert.gray.hsv = convert.gray.hsl;

      convert.gray.hwb = function (gray) {
        return [0, 100, gray[0]];
      };

      convert.gray.cmyk = function (gray) {
        return [0, 0, 0, gray[0]];
      };

      convert.gray.lab = function (gray) {
        return [gray[0], 0, 0];
      };

      convert.gray.hex = function (gray) {
        const val = Math.round((gray[0] / 100) * 255) & 0xff;
        const integer = (val << 16) + (val << 8) + val;

        const string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
      };

      convert.rgb.gray = function (rgb) {
        const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [(val / 255) * 100];
      };

      /***/
    },

    /***/ 931: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      const conversions = __nccwpck_require__(391);
      const route = __nccwpck_require__(880);

      const convert = {};

      const models = Object.keys(conversions);

      function wrapRaw(fn) {
        const wrappedFn = function (...args) {
          const arg0 = args[0];
          if (arg0 === undefined || arg0 === null) {
            return arg0;
          }

          if (arg0.length > 1) {
            args = arg0;
          }

          return fn(args);
        };

        // Preserve .conversion property if there is one
        if ('conversion' in fn) {
          wrappedFn.conversion = fn.conversion;
        }

        return wrappedFn;
      }

      function wrapRounded(fn) {
        const wrappedFn = function (...args) {
          const arg0 = args[0];

          if (arg0 === undefined || arg0 === null) {
            return arg0;
          }

          if (arg0.length > 1) {
            args = arg0;
          }

          const result = fn(args);

          // We're assuming the result is an array here.
          // see notice in conversions.js; don't use box types
          // in conversion functions.
          if (typeof result === 'object') {
            for (let len = result.length, i = 0; i < len; i++) {
              result[i] = Math.round(result[i]);
            }
          }

          return result;
        };

        // Preserve .conversion property if there is one
        if ('conversion' in fn) {
          wrappedFn.conversion = fn.conversion;
        }

        return wrappedFn;
      }

      models.forEach((fromModel) => {
        convert[fromModel] = {};

        Object.defineProperty(convert[fromModel], 'channels', {
          value: conversions[fromModel].channels,
        });
        Object.defineProperty(convert[fromModel], 'labels', {
          value: conversions[fromModel].labels,
        });

        const routes = route(fromModel);
        const routeModels = Object.keys(routes);

        routeModels.forEach((toModel) => {
          const fn = routes[toModel];

          convert[fromModel][toModel] = wrapRounded(fn);
          convert[fromModel][toModel].raw = wrapRaw(fn);
        });
      });

      module.exports = convert;

      /***/
    },

    /***/ 880: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      const conversions = __nccwpck_require__(391);

      /*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

      function buildGraph() {
        const graph = {};
        // https://jsperf.com/object-keys-vs-for-in-with-closure/3
        const models = Object.keys(conversions);

        for (let len = models.length, i = 0; i < len; i++) {
          graph[models[i]] = {
            // http://jsperf.com/1-vs-infinity
            // micro-opt, but this is simple.
            distance: -1,
            parent: null,
          };
        }

        return graph;
      }

      // https://en.wikipedia.org/wiki/Breadth-first_search
      function deriveBFS(fromModel) {
        const graph = buildGraph();
        const queue = [fromModel]; // Unshift -> queue -> pop

        graph[fromModel].distance = 0;

        while (queue.length) {
          const current = queue.pop();
          const adjacents = Object.keys(conversions[current]);

          for (let len = adjacents.length, i = 0; i < len; i++) {
            const adjacent = adjacents[i];
            const node = graph[adjacent];

            if (node.distance === -1) {
              node.distance = graph[current].distance + 1;
              node.parent = current;
              queue.unshift(adjacent);
            }
          }
        }

        return graph;
      }

      function link(from, to) {
        return function (args) {
          return to(from(args));
        };
      }

      function wrapConversion(toModel, graph) {
        const path = [graph[toModel].parent, toModel];
        let fn = conversions[graph[toModel].parent][toModel];

        let cur = graph[toModel].parent;
        while (graph[cur].parent) {
          path.unshift(graph[cur].parent);
          fn = link(conversions[graph[cur].parent][cur], fn);
          cur = graph[cur].parent;
        }

        fn.conversion = path;
        return fn;
      }

      module.exports = function (fromModel) {
        const graph = deriveBFS(fromModel);
        const conversion = {};

        const models = Object.keys(graph);
        for (let len = models.length, i = 0; i < len; i++) {
          const toModel = models[i];
          const node = graph[toModel];

          if (node.parent === null) {
            // No possible conversion, or this node is the source model.
            continue;
          }

          conversion[toModel] = wrapConversion(toModel, graph);
        }

        return conversion;
      };

      /***/
    },

    /***/ 510: /***/ (module) => {
      'use strict';

      module.exports = {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 134, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 250, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 221],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        rebeccapurple: [102, 51, 153],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [112, 128, 144],
        slategrey: [112, 128, 144],
        snow: [255, 250, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 50],
      };

      /***/
    },

    /***/ 621: /***/ (module) => {
      'use strict';

      module.exports = (flag, argv = process.argv) => {
        const prefix = flag.startsWith('-')
          ? ''
          : flag.length === 1
          ? '-'
          : '--';
        const position = argv.indexOf(prefix + flag);
        const terminatorPosition = argv.indexOf('--');
        return (
          position !== -1 &&
          (terminatorPosition === -1 || position < terminatorPosition)
        );
      };

      /***/
    },

    /***/ 228: /***/ (module) => {
      'use strict';

      module.exports = () => {
        if (process.platform !== 'win32') {
          return true;
        }

        return (
          Boolean(process.env.CI) ||
          Boolean(process.env.WT_SESSION) || // Windows Terminal
          process.env.TERM_PROGRAM === 'vscode' ||
          process.env.TERM === 'xterm-256color' ||
          process.env.TERM === 'alacritty'
        );
      };

      /***/
    },

    /***/ 479: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const chalk = __nccwpck_require__(818);
      const isUnicodeSupported = __nccwpck_require__(228);

      const main = {
        info: chalk.blue('???'),
        success: chalk.green('???'),
        warning: chalk.yellow('???'),
        error: chalk.red('???'),
      };

      const fallback = {
        info: chalk.blue('i'),
        success: chalk.green('???'),
        warning: chalk.yellow('???'),
        error: chalk.red('??'),
      };

      module.exports = isUnicodeSupported() ? main : fallback;

      /***/
    },

    /***/ 522: /***/ function (module) {
      /* global define */

      (function (root, pluralize) {
        /* istanbul ignore else */
        if (true) {
          // Node.
          module.exports = pluralize();
        } else {
        }
      })(this, function () {
        // Rule storage - pluralize and singularize need to be run sequentially,
        // while other rules can be optimized using an object for instant lookups.
        var pluralRules = [];
        var singularRules = [];
        var uncountables = {};
        var irregularPlurals = {};
        var irregularSingles = {};

        /**
         * Sanitize a pluralization rule to a usable regular expression.
         *
         * @param  {(RegExp|string)} rule
         * @return {RegExp}
         */
        function sanitizeRule(rule) {
          if (typeof rule === 'string') {
            return new RegExp('^' + rule + '$', 'i');
          }

          return rule;
        }

        /**
         * Pass in a word token to produce a function that can replicate the case on
         * another word.
         *
         * @param  {string}   word
         * @param  {string}   token
         * @return {Function}
         */
        function restoreCase(word, token) {
          // Tokens are an exact match.
          if (word === token) return token;

          // Lower cased words. E.g. "hello".
          if (word === word.toLowerCase()) return token.toLowerCase();

          // Upper cased words. E.g. "WHISKY".
          if (word === word.toUpperCase()) return token.toUpperCase();

          // Title cased words. E.g. "Title".
          if (word[0] === word[0].toUpperCase()) {
            return (
              token.charAt(0).toUpperCase() + token.substr(1).toLowerCase()
            );
          }

          // Lower cased words. E.g. "test".
          return token.toLowerCase();
        }

        /**
         * Interpolate a regexp string.
         *
         * @param  {string} str
         * @param  {Array}  args
         * @return {string}
         */
        function interpolate(str, args) {
          return str.replace(/\$(\d{1,2})/g, function (match, index) {
            return args[index] || '';
          });
        }

        /**
         * Replace a word using a rule.
         *
         * @param  {string} word
         * @param  {Array}  rule
         * @return {string}
         */
        function replace(word, rule) {
          return word.replace(rule[0], function (match, index) {
            var result = interpolate(rule[1], arguments);

            if (match === '') {
              return restoreCase(word[index - 1], result);
            }

            return restoreCase(match, result);
          });
        }

        /**
         * Sanitize a word by passing in the word and sanitization rules.
         *
         * @param  {string}   token
         * @param  {string}   word
         * @param  {Array}    rules
         * @return {string}
         */
        function sanitizeWord(token, word, rules) {
          // Empty string or doesn't need fixing.
          if (!token.length || uncountables.hasOwnProperty(token)) {
            return word;
          }

          var len = rules.length;

          // Iterate over the sanitization rules and use the first one to match.
          while (len--) {
            var rule = rules[len];

            if (rule[0].test(word)) return replace(word, rule);
          }

          return word;
        }

        /**
         * Replace a word with the updated word.
         *
         * @param  {Object}   replaceMap
         * @param  {Object}   keepMap
         * @param  {Array}    rules
         * @return {Function}
         */
        function replaceWord(replaceMap, keepMap, rules) {
          return function (word) {
            // Get the correct token and case restoration functions.
            var token = word.toLowerCase();

            // Check against the keep object map.
            if (keepMap.hasOwnProperty(token)) {
              return restoreCase(word, token);
            }

            // Check against the replacement map for a direct word replacement.
            if (replaceMap.hasOwnProperty(token)) {
              return restoreCase(word, replaceMap[token]);
            }

            // Run all the rules against the word.
            return sanitizeWord(token, word, rules);
          };
        }

        /**
         * Check if a word is part of the map.
         */
        function checkWord(replaceMap, keepMap, rules, bool) {
          return function (word) {
            var token = word.toLowerCase();

            if (keepMap.hasOwnProperty(token)) return true;
            if (replaceMap.hasOwnProperty(token)) return false;

            return sanitizeWord(token, token, rules) === token;
          };
        }

        /**
         * Pluralize or singularize a word based on the passed in count.
         *
         * @param  {string}  word      The word to pluralize
         * @param  {number}  count     How many of the word exist
         * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
         * @return {string}
         */
        function pluralize(word, count, inclusive) {
          var pluralized =
            count === 1 ? pluralize.singular(word) : pluralize.plural(word);

          return (inclusive ? count + ' ' : '') + pluralized;
        }

        /**
         * Pluralize a word.
         *
         * @type {Function}
         */
        pluralize.plural = replaceWord(
          irregularSingles,
          irregularPlurals,
          pluralRules
        );

        /**
         * Check if a word is plural.
         *
         * @type {Function}
         */
        pluralize.isPlural = checkWord(
          irregularSingles,
          irregularPlurals,
          pluralRules
        );

        /**
         * Singularize a word.
         *
         * @type {Function}
         */
        pluralize.singular = replaceWord(
          irregularPlurals,
          irregularSingles,
          singularRules
        );

        /**
         * Check if a word is singular.
         *
         * @type {Function}
         */
        pluralize.isSingular = checkWord(
          irregularPlurals,
          irregularSingles,
          singularRules
        );

        /**
         * Add a pluralization rule to the collection.
         *
         * @param {(string|RegExp)} rule
         * @param {string}          replacement
         */
        pluralize.addPluralRule = function (rule, replacement) {
          pluralRules.push([sanitizeRule(rule), replacement]);
        };

        /**
         * Add a singularization rule to the collection.
         *
         * @param {(string|RegExp)} rule
         * @param {string}          replacement
         */
        pluralize.addSingularRule = function (rule, replacement) {
          singularRules.push([sanitizeRule(rule), replacement]);
        };

        /**
         * Add an uncountable word rule.
         *
         * @param {(string|RegExp)} word
         */
        pluralize.addUncountableRule = function (word) {
          if (typeof word === 'string') {
            uncountables[word.toLowerCase()] = true;
            return;
          }

          // Set singular and plural references for the word.
          pluralize.addPluralRule(word, '$0');
          pluralize.addSingularRule(word, '$0');
        };

        /**
         * Add an irregular word definition.
         *
         * @param {string} single
         * @param {string} plural
         */
        pluralize.addIrregularRule = function (single, plural) {
          plural = plural.toLowerCase();
          single = single.toLowerCase();

          irregularSingles[single] = plural;
          irregularPlurals[plural] = single;
        };

        /**
         * Irregular rules.
         */
        [
          // Pronouns.
          ['I', 'we'],
          ['me', 'us'],
          ['he', 'they'],
          ['she', 'they'],
          ['them', 'them'],
          ['myself', 'ourselves'],
          ['yourself', 'yourselves'],
          ['itself', 'themselves'],
          ['herself', 'themselves'],
          ['himself', 'themselves'],
          ['themself', 'themselves'],
          ['is', 'are'],
          ['was', 'were'],
          ['has', 'have'],
          ['this', 'these'],
          ['that', 'those'],
          // Words ending in with a consonant and `o`.
          ['echo', 'echoes'],
          ['dingo', 'dingoes'],
          ['volcano', 'volcanoes'],
          ['tornado', 'tornadoes'],
          ['torpedo', 'torpedoes'],
          // Ends with `us`.
          ['genus', 'genera'],
          ['viscus', 'viscera'],
          // Ends with `ma`.
          ['stigma', 'stigmata'],
          ['stoma', 'stomata'],
          ['dogma', 'dogmata'],
          ['lemma', 'lemmata'],
          ['schema', 'schemata'],
          ['anathema', 'anathemata'],
          // Other irregular rules.
          ['ox', 'oxen'],
          ['axe', 'axes'],
          ['die', 'dice'],
          ['yes', 'yeses'],
          ['foot', 'feet'],
          ['eave', 'eaves'],
          ['goose', 'geese'],
          ['tooth', 'teeth'],
          ['quiz', 'quizzes'],
          ['human', 'humans'],
          ['proof', 'proofs'],
          ['carve', 'carves'],
          ['valve', 'valves'],
          ['looey', 'looies'],
          ['thief', 'thieves'],
          ['groove', 'grooves'],
          ['pickaxe', 'pickaxes'],
          ['passerby', 'passersby'],
        ].forEach(function (rule) {
          return pluralize.addIrregularRule(rule[0], rule[1]);
        });

        /**
         * Pluralization rules.
         */
        [
          [/s?$/i, 's'],
          [/[^\u0000-\u007F]$/i, '$0'],
          [/([^aeiou]ese)$/i, '$1'],
          [/(ax|test)is$/i, '$1es'],
          [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
          [/(e[mn]u)s?$/i, '$1s'],
          [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
          [
            /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
            '$1i',
          ],
          [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
          [/(seraph|cherub)(?:im)?$/i, '$1im'],
          [/(her|at|gr)o$/i, '$1oes'],
          [
            /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i,
            '$1a',
          ],
          [
            /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i,
            '$1a',
          ],
          [/sis$/i, 'ses'],
          [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
          [/([^aeiouy]|qu)y$/i, '$1ies'],
          [/([^ch][ieo][ln])ey$/i, '$1ies'],
          [/(x|ch|ss|sh|zz)$/i, '$1es'],
          [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
          [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
          [/(pe)(?:rson|ople)$/i, '$1ople'],
          [/(child)(?:ren)?$/i, '$1ren'],
          [/eaux$/i, '$0'],
          [/m[ae]n$/i, 'men'],
          ['thou', 'you'],
        ].forEach(function (rule) {
          return pluralize.addPluralRule(rule[0], rule[1]);
        });

        /**
         * Singularization rules.
         */
        [
          [/s$/i, ''],
          [/(ss)$/i, '$1'],
          [
            /(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i,
            '$1fe',
          ],
          [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
          [/ies$/i, 'y'],
          [
            /\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i,
            '$1ie',
          ],
          [/\b(mon|smil)ies$/i, '$1ey'],
          [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
          [/(seraph|cherub)im$/i, '$1'],
          [
            /(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i,
            '$1',
          ],
          [
            /(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i,
            '$1sis',
          ],
          [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
          [/(test)(?:is|es)$/i, '$1is'],
          [
            /(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i,
            '$1us',
          ],
          [
            /(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i,
            '$1um',
          ],
          [
            /(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i,
            '$1on',
          ],
          [/(alumn|alg|vertebr)ae$/i, '$1a'],
          [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
          [/(matr|append)ices$/i, '$1ix'],
          [/(pe)(rson|ople)$/i, '$1rson'],
          [/(child)ren$/i, '$1'],
          [/(eau)x?$/i, '$1'],
          [/men$/i, 'man'],
        ].forEach(function (rule) {
          return pluralize.addSingularRule(rule[0], rule[1]);
        });

        /**
         * Uncountable rules.
         */
        [
          // Singular words with no plurals.
          'adulthood',
          'advice',
          'agenda',
          'aid',
          'aircraft',
          'alcohol',
          'ammo',
          'analytics',
          'anime',
          'athletics',
          'audio',
          'bison',
          'blood',
          'bream',
          'buffalo',
          'butter',
          'carp',
          'cash',
          'chassis',
          'chess',
          'clothing',
          'cod',
          'commerce',
          'cooperation',
          'corps',
          'debris',
          'diabetes',
          'digestion',
          'elk',
          'energy',
          'equipment',
          'excretion',
          'expertise',
          'firmware',
          'flounder',
          'fun',
          'gallows',
          'garbage',
          'graffiti',
          'hardware',
          'headquarters',
          'health',
          'herpes',
          'highjinks',
          'homework',
          'housework',
          'information',
          'jeans',
          'justice',
          'kudos',
          'labour',
          'literature',
          'machinery',
          'mackerel',
          'mail',
          'media',
          'mews',
          'moose',
          'music',
          'mud',
          'manga',
          'news',
          'only',
          'personnel',
          'pike',
          'plankton',
          'pliers',
          'police',
          'pollution',
          'premises',
          'rain',
          'research',
          'rice',
          'salmon',
          'scissors',
          'series',
          'sewage',
          'shambles',
          'shrimp',
          'software',
          'species',
          'staff',
          'swine',
          'tennis',
          'traffic',
          'transportation',
          'trout',
          'tuna',
          'wealth',
          'welfare',
          'whiting',
          'wildebeest',
          'wildlife',
          'you',
          /pok[e??]mon$/i,
          // Regexes.
          /[^aeiou]ese$/i, // "chinese", "japanese"
          /deer$/i, // "deer", "reindeer"
          /fish$/i, // "fish", "blowfish", "angelfish"
          /measles$/i,
          /o[iu]s$/i, // "carnivorous"
          /pox$/i, // "chickpox", "smallpox"
          /sheep$/i,
        ].forEach(pluralize.addUncountableRule);

        return pluralize;
      });

      /***/
    },

    /***/ 318: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      'use strict';

      const os = __nccwpck_require__(37);
      const tty = __nccwpck_require__(224);
      const hasFlag = __nccwpck_require__(621);

      const {env} = process;

      let forceColor;
      if (
        hasFlag('no-color') ||
        hasFlag('no-colors') ||
        hasFlag('color=false') ||
        hasFlag('color=never')
      ) {
        forceColor = 0;
      } else if (
        hasFlag('color') ||
        hasFlag('colors') ||
        hasFlag('color=true') ||
        hasFlag('color=always')
      ) {
        forceColor = 1;
      }

      if ('FORCE_COLOR' in env) {
        if (env.FORCE_COLOR === 'true') {
          forceColor = 1;
        } else if (env.FORCE_COLOR === 'false') {
          forceColor = 0;
        } else {
          forceColor =
            env.FORCE_COLOR.length === 0
              ? 1
              : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
        }
      }

      function translateLevel(level) {
        if (level === 0) {
          return false;
        }

        return {
          level,
          hasBasic: true,
          has256: level >= 2,
          has16m: level >= 3,
        };
      }

      function supportsColor(haveStream, streamIsTTY) {
        if (forceColor === 0) {
          return 0;
        }

        if (
          hasFlag('color=16m') ||
          hasFlag('color=full') ||
          hasFlag('color=truecolor')
        ) {
          return 3;
        }

        if (hasFlag('color=256')) {
          return 2;
        }

        if (haveStream && !streamIsTTY && forceColor === undefined) {
          return 0;
        }

        const min = forceColor || 0;

        if (env.TERM === 'dumb') {
          return min;
        }

        if (process.platform === 'win32') {
          // Windows 10 build 10586 is the first Windows release that supports 256 colors.
          // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
          const osRelease = os.release().split('.');
          if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
            return Number(osRelease[2]) >= 14931 ? 3 : 2;
          }

          return 1;
        }

        if ('CI' in env) {
          if (
            [
              'TRAVIS',
              'CIRCLECI',
              'APPVEYOR',
              'GITLAB_CI',
              'GITHUB_ACTIONS',
              'BUILDKITE',
            ].some((sign) => sign in env) ||
            env.CI_NAME === 'codeship'
          ) {
            return 1;
          }

          return min;
        }

        if ('TEAMCITY_VERSION' in env) {
          return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION)
            ? 1
            : 0;
        }

        if (env.COLORTERM === 'truecolor') {
          return 3;
        }

        if ('TERM_PROGRAM' in env) {
          const version = parseInt(
            (env.TERM_PROGRAM_VERSION || '').split('.')[0],
            10
          );

          switch (env.TERM_PROGRAM) {
            case 'iTerm.app':
              return version >= 3 ? 3 : 2;
            case 'Apple_Terminal':
              return 2;
            // No default
          }
        }

        if (/-256(color)?$/i.test(env.TERM)) {
          return 2;
        }

        if (
          /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
            env.TERM
          )
        ) {
          return 1;
        }

        if ('COLORTERM' in env) {
          return 1;
        }

        return min;
      }

      function getSupportLevel(stream) {
        const level = supportsColor(stream, stream && stream.isTTY);
        return translateLevel(level);
      }

      module.exports = {
        supportsColor: getSupportLevel,
        stdout: translateLevel(supportsColor(true, tty.isatty(1))),
        stderr: translateLevel(supportsColor(true, tty.isatty(2))),
      };

      /***/
    },

    /***/ 294: /***/ (
      module,
      __unused_webpack_exports,
      __nccwpck_require__
    ) => {
      module.exports = __nccwpck_require__(219);

      /***/
    },

    /***/ 219: /***/ (
      __unused_webpack_module,
      exports,
      __nccwpck_require__
    ) => {
      'use strict';

      var net = __nccwpck_require__(808);
      var tls = __nccwpck_require__(404);
      var http = __nccwpck_require__(685);
      var https = __nccwpck_require__(687);
      var events = __nccwpck_require__(361);
      var assert = __nccwpck_require__(491);
      var util = __nccwpck_require__(837);

      exports.httpOverHttp = httpOverHttp;
      exports.httpsOverHttp = httpsOverHttp;
      exports.httpOverHttps = httpOverHttps;
      exports.httpsOverHttps = httpsOverHttps;

      function httpOverHttp(options) {
        var agent = new TunnelingAgent(options);
        agent.request = http.request;
        return agent;
      }

      function httpsOverHttp(options) {
        var agent = new TunnelingAgent(options);
        agent.request = http.request;
        agent.createSocket = createSecureSocket;
        agent.defaultPort = 443;
        return agent;
      }

      function httpOverHttps(options) {
        var agent = new TunnelingAgent(options);
        agent.request = https.request;
        return agent;
      }

      function httpsOverHttps(options) {
        var agent = new TunnelingAgent(options);
        agent.request = https.request;
        agent.createSocket = createSecureSocket;
        agent.defaultPort = 443;
        return agent;
      }

      function TunnelingAgent(options) {
        var self = this;
        self.options = options || {};
        self.proxyOptions = self.options.proxy || {};
        self.maxSockets =
          self.options.maxSockets || http.Agent.defaultMaxSockets;
        self.requests = [];
        self.sockets = [];

        self.on('free', function onFree(socket, host, port, localAddress) {
          var options = toOptions(host, port, localAddress);
          for (var i = 0, len = self.requests.length; i < len; ++i) {
            var pending = self.requests[i];
            if (
              pending.host === options.host &&
              pending.port === options.port
            ) {
              // Detect the request to connect same origin server,
              // reuse the connection.
              self.requests.splice(i, 1);
              pending.request.onSocket(socket);
              return;
            }
          }
          socket.destroy();
          self.removeSocket(socket);
        });
      }
      util.inherits(TunnelingAgent, events.EventEmitter);

      TunnelingAgent.prototype.addRequest = function addRequest(
        req,
        host,
        port,
        localAddress
      ) {
        var self = this;
        var options = mergeOptions(
          {request: req},
          self.options,
          toOptions(host, port, localAddress)
        );

        if (self.sockets.length >= this.maxSockets) {
          // We are over limit so we'll add it to the queue.
          self.requests.push(options);
          return;
        }

        // If we are under maxSockets create a new one.
        self.createSocket(options, function (socket) {
          socket.on('free', onFree);
          socket.on('close', onCloseOrRemove);
          socket.on('agentRemove', onCloseOrRemove);
          req.onSocket(socket);

          function onFree() {
            self.emit('free', socket, options);
          }

          function onCloseOrRemove(err) {
            self.removeSocket(socket);
            socket.removeListener('free', onFree);
            socket.removeListener('close', onCloseOrRemove);
            socket.removeListener('agentRemove', onCloseOrRemove);
          }
        });
      };

      TunnelingAgent.prototype.createSocket = function createSocket(
        options,
        cb
      ) {
        var self = this;
        var placeholder = {};
        self.sockets.push(placeholder);

        var connectOptions = mergeOptions({}, self.proxyOptions, {
          method: 'CONNECT',
          path: options.host + ':' + options.port,
          agent: false,
          headers: {
            host: options.host + ':' + options.port,
          },
        });
        if (options.localAddress) {
          connectOptions.localAddress = options.localAddress;
        }
        if (connectOptions.proxyAuth) {
          connectOptions.headers = connectOptions.headers || {};
          connectOptions.headers['Proxy-Authorization'] =
            'Basic ' + new Buffer(connectOptions.proxyAuth).toString('base64');
        }

        debug('making CONNECT request');
        var connectReq = self.request(connectOptions);
        connectReq.useChunkedEncodingByDefault = false; // for v0.6
        connectReq.once('response', onResponse); // for v0.6
        connectReq.once('upgrade', onUpgrade); // for v0.6
        connectReq.once('connect', onConnect); // for v0.7 or later
        connectReq.once('error', onError);
        connectReq.end();

        function onResponse(res) {
          // Very hacky. This is necessary to avoid http-parser leaks.
          res.upgrade = true;
        }

        function onUpgrade(res, socket, head) {
          // Hacky.
          process.nextTick(function () {
            onConnect(res, socket, head);
          });
        }

        function onConnect(res, socket, head) {
          connectReq.removeAllListeners();
          socket.removeAllListeners();

          if (res.statusCode !== 200) {
            debug(
              'tunneling socket could not be established, statusCode=%d',
              res.statusCode
            );
            socket.destroy();
            var error = new Error(
              'tunneling socket could not be established, ' +
                'statusCode=' +
                res.statusCode
            );
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
          }
          if (head.length > 0) {
            debug('got illegal response body from proxy');
            socket.destroy();
            var error = new Error('got illegal response body from proxy');
            error.code = 'ECONNRESET';
            options.request.emit('error', error);
            self.removeSocket(placeholder);
            return;
          }
          debug('tunneling connection has established');
          self.sockets[self.sockets.indexOf(placeholder)] = socket;
          return cb(socket);
        }

        function onError(cause) {
          connectReq.removeAllListeners();

          debug(
            'tunneling socket could not be established, cause=%s\n',
            cause.message,
            cause.stack
          );
          var error = new Error(
            'tunneling socket could not be established, ' +
              'cause=' +
              cause.message
          );
          error.code = 'ECONNRESET';
          options.request.emit('error', error);
          self.removeSocket(placeholder);
        }
      };

      TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
        var pos = this.sockets.indexOf(socket);
        if (pos === -1) {
          return;
        }
        this.sockets.splice(pos, 1);

        var pending = this.requests.shift();
        if (pending) {
          // If we have pending requests and a socket gets closed a new one
          // needs to be created to take over in the pool for the one that closed.
          this.createSocket(pending, function (socket) {
            pending.request.onSocket(socket);
          });
        }
      };

      function createSecureSocket(options, cb) {
        var self = this;
        TunnelingAgent.prototype.createSocket.call(
          self,
          options,
          function (socket) {
            var hostHeader = options.request.getHeader('host');
            var tlsOptions = mergeOptions({}, self.options, {
              socket: socket,
              servername: hostHeader
                ? hostHeader.replace(/:.*$/, '')
                : options.host,
            });

            // 0 is dummy port for v0.6
            var secureSocket = tls.connect(0, tlsOptions);
            self.sockets[self.sockets.indexOf(socket)] = secureSocket;
            cb(secureSocket);
          }
        );
      }

      function toOptions(host, port, localAddress) {
        if (typeof host === 'string') {
          // since v0.10
          return {
            host: host,
            port: port,
            localAddress: localAddress,
          };
        }
        return host; // for v0.11 or later
      }

      function mergeOptions(target) {
        for (var i = 1, len = arguments.length; i < len; ++i) {
          var overrides = arguments[i];
          if (typeof overrides === 'object') {
            var keys = Object.keys(overrides);
            for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
              var k = keys[j];
              if (overrides[k] !== undefined) {
                target[k] = overrides[k];
              }
            }
          }
        }
        return target;
      }

      var debug;
      if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
        debug = function () {
          var args = Array.prototype.slice.call(arguments);
          if (typeof args[0] === 'string') {
            args[0] = 'TUNNEL: ' + args[0];
          } else {
            args.unshift('TUNNEL:');
          }
          console.error.apply(console, args);
        };
      } else {
        debug = function () {};
      }
      exports.debug = debug; // for test

      /***/
    },

    /***/ 491: /***/ (module) => {
      'use strict';
      module.exports = require('assert');

      /***/
    },

    /***/ 81: /***/ (module) => {
      'use strict';
      module.exports = require('child_process');

      /***/
    },

    /***/ 361: /***/ (module) => {
      'use strict';
      module.exports = require('events');

      /***/
    },

    /***/ 147: /***/ (module) => {
      'use strict';
      module.exports = require('fs');

      /***/
    },

    /***/ 292: /***/ (module) => {
      'use strict';
      module.exports = require('fs/promises');

      /***/
    },

    /***/ 685: /***/ (module) => {
      'use strict';
      module.exports = require('http');

      /***/
    },

    /***/ 687: /***/ (module) => {
      'use strict';
      module.exports = require('https');

      /***/
    },

    /***/ 808: /***/ (module) => {
      'use strict';
      module.exports = require('net');

      /***/
    },

    /***/ 37: /***/ (module) => {
      'use strict';
      module.exports = require('os');

      /***/
    },

    /***/ 17: /***/ (module) => {
      'use strict';
      module.exports = require('path');

      /***/
    },

    /***/ 576: /***/ (module) => {
      'use strict';
      module.exports = require('string_decoder');

      /***/
    },

    /***/ 512: /***/ (module) => {
      'use strict';
      module.exports = require('timers');

      /***/
    },

    /***/ 404: /***/ (module) => {
      'use strict';
      module.exports = require('tls');

      /***/
    },

    /***/ 224: /***/ (module) => {
      'use strict';
      module.exports = require('tty');

      /***/
    },

    /***/ 837: /***/ (module) => {
      'use strict';
      module.exports = require('util');

      /***/
    },

    /******/
  };
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __nccwpck_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ id: moduleId,
      /******/ loaded: false,
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ var threw = true;
    /******/ try {
      /******/ __webpack_modules__[moduleId].call(
        module.exports,
        module,
        module.exports,
        __nccwpck_require__
      );
      /******/ threw = false;
      /******/
    } finally {
      /******/ if (threw) delete __webpack_module_cache__[moduleId];
      /******/
    }
    /******/
    /******/ // Flag the module as loaded
    /******/ module.loaded = true;
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/node module decorator */
  /******/ (() => {
    /******/ __nccwpck_require__.nmd = (module) => {
      /******/ module.paths = [];
      /******/ if (!module.children) module.children = [];
      /******/ return module;
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/compat */
  /******/
  /******/ if (typeof __nccwpck_require__ !== 'undefined')
    __nccwpck_require__.ab = __dirname + '/';
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    const pluralize = __nccwpck_require__(522);
    const {success, info, error, warning} = __nccwpck_require__(479);
    const core = __nccwpck_require__(186);
    const {getExecOutput} = __nccwpck_require__(514);
    const {which} = __nccwpck_require__(436);
    const {inspect} = __nccwpck_require__(837);
    const fs = __nccwpck_require__(292);
    const path = __nccwpck_require__(17);
    const {tmpdir} = __nccwpck_require__(37);

    const TMP_DIR_PREFIX = 'nodejs-production-test-action-';

    const log = {
      /** @param {string} msg */
      info(msg) {
        core.info(`${info} ${msg}`);
      },
      /** @param {string} msg */
      fail(msg) {
        core.setFailed(`${error} ${msg}`);
      },
      /** @param {string} msg */
      ok(msg) {
        core.info(`${success} ${msg}`);
      },
      /** @param {string} msg */
      warn(msg) {
        core.warning(`${warning} ${msg}`);
      },
      /** @param {any} value */
      dir(value) {
        core.info(inspect(value, {depth: null}));
      },
    };

    async function findNpm() {
      try {
        const npmPath = await which('npm', true);
        log.ok(`Found npm at ${npmPath}`);
        return npmPath;
      } catch (err) {
        const {message} = /** @type {Error} */ (err);
        throw new Error(`npm not found in PATH: ${message}`);
      }
    }

    async function createTempDir() {
      try {
        const tmpDir = await fs.mkdtemp(path.join(tmpdir(), TMP_DIR_PREFIX));
        log.info(`Using temp dir ${tmpDir}`);
        return tmpDir;
      } catch (err) {
        const {message} = /** @type {NodeJS.ErrnoException} */ (err);
        throw new Error(`Failed to create temporary directory: ${message}`);
      }
    }

    /**
     * Runs `npm pack` on each package in `workspaces`
     * @param {PackOptions} opts
     * @returns {Promise<PackResult[]>}
     */
    async function pack({
      npmPath,
      tmpDir,
      workspaces = [],
      allWorkspaces = false,
      includeWorkspaceRoot = false,
      silent = false,
    }) {
      let packArgs = [
        'pack',
        '--json',
        `--pack-destination=${tmpDir}`,
        '--foreground-scripts=false', // suppress output of lifecycle scripts so json can be parsed
        '--silent',
      ];
      if (workspaces.length) {
        packArgs = [...packArgs, ...workspaces.map((w) => `--workspace=${w}`)];
      } else if (allWorkspaces) {
        packArgs = [...packArgs, '--workspaces'];
        if (includeWorkspaceRoot) {
          packArgs = [...packArgs, '--include-workspace-root'];
        }
      }

      if (allWorkspaces) {
        log.info('Packing all workspaces; please wait???');
      } else {
        log.info(
          `Packing ${pluralize(
            'workspace',
            workspaces.length,
            true
          )}; please wait???`
        );
      }
      const {stdout: packOutput, exitCode} = await getExecOutput(
        npmPath,
        packArgs,
        {silent}
      );
      if (exitCode) {
        throw new Error(`"npm pack" failed with exit code ${exitCode}`);
      }

      try {
        /** @type {NpmPackResult[]} */
        const parsed = JSON.parse(packOutput);
        const result = parsed.map(({filename, name}) => {
          // workaround for https://github.com/npm/cli/issues/3405
          filename = filename.replace(/^@(.+?)\//, '$1-');
          return {
            tarballFilepath: path.join(tmpDir, filename),
            installPath: path.join(tmpDir, 'node_modules', name),
          };
        });
        log.ok(`Packed ${pluralize('package', result.length, true)}`);
        return result;
      } catch (err) {
        const {message} = /** @type {SyntaxError} */ (err);
        throw new Error(
          `Failed to parse JSON output from npm pack: ${message}`
        );
      }
    }

    /**
     * Runs `npm install` with every packed file in a temp dir
     * @param {InstallOptions} opts
     * @returns {Promise<void>}
     */
    async function install({
      npmPath,
      tmpDir: cwd,
      packResults = [],
      extraArgs = [],
      silent = false,
    }) {
      if (packResults.length) {
        const installArgs = [
          'install',
          ...extraArgs,
          ...packResults.map(({tarballFilepath}) => tarballFilepath),
        ];

        const {exitCode: installExitCode} = await getExecOutput(
          npmPath,
          installArgs,
          {cwd, silent}
        );

        if (installExitCode) {
          throw new Error(
            `"npm install" failed with exit code ${installExitCode}`
          );
        }
        log.ok(`Installed ${pluralize('package', packResults.length, true)}`);
      } else {
        log.warn(`No packages to install`);
      }
    }

    /**
     * Runs the specified `scriptName` npm script for each package in `packResults`
     * @param {RunScriptOptions} opts
     * @returns {Promise<void>}
     */
    async function runScript({
      npmPath,
      scriptName,
      scriptArgs = [],
      packResults = [],
      silent = false,
    }) {
      let scriptNameArgs = ['run-script', scriptName];
      if (scriptArgs) {
        scriptNameArgs = [...scriptNameArgs, ...scriptArgs];
      }

      for await (const {installPath: cwd} of packResults) {
        const {exitCode} = await getExecOutput(npmPath, scriptNameArgs, {
          cwd,
          silent,
        });
        if (exitCode) {
          throw new Error(
            `npm script "${scriptName}" failed with exit code ${exitCode}`
          );
        }
      }
      log.ok(
        `Ran npm script "${scriptName}" in ${pluralize(
          'package',
          packResults.length,
          true
        )}`
      );
    }

    /**
     * split a string by whitespace. if the string is empty, return an empty array.
     * @param {string} str
     */
    function splitByWhitespace(str) {
      if (str) {
        return str.split(/\s+/g);
      }
      return [];
    }

    function getInputs() {
      const scriptName = core.getInput('script', {required: true});
      const workspaces = splitByWhitespace(core.getInput('workspace'));
      const allWorkspaces = core.getBooleanInput('workspaces');
      const scriptArgs = splitByWhitespace(core.getInput('scriptArgs'));
      const includeWorkspaceRoot = core.getBooleanInput('includeWorkspaceRoot');
      const extraArgs = splitByWhitespace(core.getInput('extraNpmInstallArgs'));
      const silent = core.getBooleanInput('quiet');
      return {
        scriptName,
        workspaces,
        allWorkspaces,
        scriptArgs,
        includeWorkspaceRoot,
        extraArgs,
        silent,
      };
    }

    async function main() {
      if (process.env.npm_config_nodejs_production_test_action) {
        log.ok('Internal test OK');
        return;
      }

      const {
        scriptName,
        workspaces,
        allWorkspaces,
        scriptArgs,
        includeWorkspaceRoot,
        extraArgs,
        silent,
      } = getInputs();

      const npmPath = await findNpm();
      const tmpDir = await createTempDir();
      try {
        const packResults = await pack({
          npmPath,
          tmpDir,
          workspaces,
          allWorkspaces,
          includeWorkspaceRoot,
          silent,
        });
        await install({
          npmPath,
          tmpDir,
          packResults,
          extraArgs,
        });
        await runScript({
          npmPath,
          scriptName,
          scriptArgs,
          packResults,
        });
      } finally {
        try {
          await fs.rm(tmpDir, {recursive: true, force: true});
        } catch {
          log.warn(`Failed to cleanup temp dir ${tmpDir}`);
        }
      }
    }

    main().catch((err) => {
      log.fail(err.message);
    });

    /**
     * Options for {@linkcode pack}
     * @typedef PackOptions
     * @property {string} npmPath
     * @property {string} tmpDir
     * @property {string[]} [workspaces]
     * @property {boolean} [allWorkspaces]
     * @property {boolean} [includeWorkspaceRoot]
     * @property {boolean} [silent]
     */

    /**
     * An item in the array returned by {@linkcode pack}
     * @typedef PackResult
     * @property {string} installPath
     * @property {string} tarballFilepath
     */

    /**
     * Options for {@linkcode install}
     * @typedef InstallOptions
     * @property {string} npmPath
     * @property {string} tmpDir
     * @property {PackResult[]} [packResults]
     * @property {string[]} [extraArgs]
     * @property {boolean} [silent]
     */

    /**
     * Options for {@linkcode runScript}
     * @typedef RunScriptOptions
     * @property {string} npmPath
     * @property {string} scriptName
     * @property {string[]} [scriptArgs]
     * @property {PackResult[]} [packResults]
     * @property {string[]} [workspaces]
     * @property {boolean} [allWorkspaces]
     * @property {boolean} [includeWorkspaceRoot]
     * @property {boolean} [silent]
     */

    /**
     * An entry as returned by `npm pack --json`. It outputs an array of this
     * @typedef NpmPackResult
     * @property {string} id
     * @property {string} name
     * @property {string} version
     * @property {number} size
     * @property {number} unpackedSize
     * @property {string} shasum
     * @property {string} integreity
     * @property {string} filename
     * @property {NpmPackResultFileEntry[]} files
     * @property {number} entryCount
     * @property {any[]} bundled - unsure what this looks like
     */

    /**
     * A part of {@linkcode NpmPackResult}
     * @typedef NpmPackResultFileEntry
     * @property {string} path
     * @property {number} size
     * @property {number} mode
     */
  })();

  module.exports = __webpack_exports__;
  /******/
})();
//# sourceMappingURL=index.js.map
