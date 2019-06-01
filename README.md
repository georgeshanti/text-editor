# TsEditor
A simple html editor for writing emails, blog posts, etc. for those of you who might not be great at it.

#### Features:
1. Text Styling
2. Paragraphs
3. Images
4. Links

## Development
<hr>
The code is written in TypeScript, although there is a lot of code that I ended up not writing types for but not to worry. That will be fixed soon.

There are 2 main components:
1. Editor - The editor environment
2. DocElement - The base class for all elemts that will be present in any document
    1. TextElement - An atomic text element.
    2. ParagraphElement - Paragraph containing TextElements
    3. TextDocument - Document containing ParagraphElements

It's not finished even up tot he features i've mentioned so far. Still strugling with a few things. Will work on it as and when I get the time.