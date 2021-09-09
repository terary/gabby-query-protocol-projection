# // EXAMPLE_BEGIN
# // EXAMPLE_END
clear; 
rm ./examples/*.html
#grep -Pzo "EXAMPLE_BEGIN\n\K(.|\n)*(?=\/\/.+EXAMPLE_END)" ./examples/ExampleProjectionEditor2.ts
HTML_CODE_SNIPPET_BEGIN="<pre><code>"
HTML_CODE_SNIPPET_END="</code></pre>"


parse_html () {
  local filename;
  tsFilename="$1";
  htmlFileName="$2"
  echo $HTML_CODE_SNIPPET_BEGIN >> $htmlFileName;
  grep -Pzo "EXAMPLE_BEGIN\n\K(.|\n)*(?=\/\/.+EXAMPLE_END)" $tsFilename >> $htmlFileName
  echo $HTML_CODE_SNIPPET_END >> $htmlFileName;
}


for snippetFile in $(grep -l EXAMPLE_BEGIN ./examples/*ts )
do
    preHtmlFile=${snippetFile/.ts/.pre.html}
    htmlFile=${snippetFile/.ts/.html}
    echo "Parsing snippets from file: '$snippetFile'"

    parse_html $snippetFile $preHtmlFile
    
    #grep's regExp injects '\0' changing charset to binary
    cat $preHtmlFile | tr -d '\0' > $htmlFile
    rm $preHtmlFile
done



for wholeFileName in $(grep -lL EXAMPLE_BEGIN ./examples/*ts )
do
    htmlFileName=${wholeFileName/.ts/.html}
    echo "Including whole file: '$wholeFileName'"

    echo $HTML_CODE_SNIPPET_BEGIN >> $htmlFileName;
    cat $wholeFileName > $htmlFileName
    echo $HTML_CODE_SNIPPET_END >> $htmlFileName;    
done

rm examples/index.html