// Generated by CoffeeScript 1.3.3
/*global module, require
*/

module.exports = function(grunt) {
  var wrapScript;
  wrapScript = function(contents, type, id, trim, tag) {
    var script;
    if (trim) {
      id = id.replace(trim, '');
    }
    contents = contents.replace(/]]>/g,"<![CDATA[]]]]><![CDATA[>]]>")
    contents = contents.replace(RegExp('"'+String.fromCharCode(0xb)+'"',"g"),"String.fromCharCode(0xb)")
    script = "<"+tag+" type=\"" + type + "\" id=\"" + id + "\"><![CDATA[" + contents + "]]></"+tag+">";
    return script;
  };
  grunt.registerHelper('inlineTag', function(config) {
    var contents, dest, groups, normalized, separator, sourceContents, src, trim, type, _results,tag;
    normalized = grunt.helper('hustler normalizeFiles', config);
    groups = normalized.groups;
    type = config.data.type;
    trim = config.data.trim;
    tag = config.data.tag;
    _results = [];
    for (dest in groups) {
      src = groups[dest];
      sourceContents = [];
      src.forEach(function(source) {
        var contents, script;
        contents = grunt.file.read(source);
        script = wrapScript(contents, type, source, trim, tag);
        return sourceContents.push(script);
      });
      separator = grunt.utils.linefeed;
      contents = sourceContents.join(grunt.utils.normalizelf(separator));
      grunt.file.write(dest, contents);
      _results.push(grunt.verbose.ok("" + src + " -> " + dest));
    }
    return _results;
  });
  return grunt.registerMultiTask('inlineTag', 'Inlines tags', function() {
    return grunt.helper('inlineTag', this);
  });
};
