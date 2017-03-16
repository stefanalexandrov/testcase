/*
THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

const request = require('request');
const http = require('http');
const fs = require('fs');
const FormData = require('form-data');
var syncFolder;
var remoteHost;

function startClient(folder, host) {
    remoteHost = 'http://' + host + '/pexip';

    console.log('Client starts... connects to ' + remoteHost);
    syncFolder = folder;
    
    fs.watch(syncFolder, { persistent: true, recursive: true }, function (eventType, filename) {
        console.log('event type is: ' + eventType);
        var form = new FormData();
        //form.append('my_field', 'my value');
        //form.append('my_buffer', new Buffer(10));
        form.append('file', fs.createReadStream(syncFolder + '/' + filename), filename);
        console.log('sending file... ');
        form.submit(remoteHost, function (err, res) { });
    });
}

module.exports = {
    startClient: startClient
}