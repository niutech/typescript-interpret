var TypeScriptInterpret = {

    outfile: {
        source: '',
        Write: function(s) {
            this.source += s;
        },
        WriteLine: function(s) {
            this.source += s + '\n';
        },
        Clear: function() {
            this.source = '';
        },
        Close: function() {}
    },

    interpret: function(cmd) {
        this.outfile.Clear();
        var compiler = new TypeScript.TypeScriptCompiler(this.outfile);
        compiler.parser.errorRecovery = true;
        compiler.setErrorCallback(function(start, len, message, block) {
            throw 'TypeScriptError: ' + message + ', char: ' + start + ', length: ' + len;
        });
        compiler.addUnit(cmd, '');
        //compiler.typeCheck(); //Disabled due to exclusion of lib.d.ts
        compiler.emit(false, function(fileName) {
            return this.outfile;
        });
    }

}
