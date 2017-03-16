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

const express = require('express');
const app = express();
const fs = require('fs');
const fileUpload = require('express-fileupload');
const busboy = require('connect-busboy');
var syncFolder;

function startServer(folder) {
    syncFolder = folder;
    console.log('server starts... ');

    /*
    app.all('/pexip*', function (req, res, next) {
        console.log('Incomming connection...');
        next();
    })
    */
    /*
    app.use(fileUpload());
 
    app.post('/pexip*', function (req, res) {
        console.log("got post request ");
        
        if (!req.files)
            return res.status(400).send('Error!');
        
        console.log("uploading file " + req.files.sampleFile.name);
        let sampleFile = req.files.sampleFile;
 
        sampleFile.mv('./testFolder/tmp.txt', function (err) {
            if (err)
                return res.status(500).send(err);

            res.send('File uploaded!');
        });
    });
    */
    app.use(busboy());
   
    app.post('/pexip*', function (req, res) {
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("receiving: " + filename);
            fstream = fs.createWriteStream(syncFolder + '/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                res.redirect('back');
            });
        });
    });

    app.listen(80);
}

module.exports = {
    startServer: startServer
}