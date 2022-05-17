# Tag Checker Problem

Markup languages such as HTML use tags to highlight sections with special significance. In this way, a sentence in boldface can be indicated thus:

`<B>This is a sentence in boldface</B>`

Typically every tag has an opening tag of the form <TAG> and a closing tag of the form </TAG>, so that portions of text can be bracketed as above. Tags can then be combined to achieve more than one effect on a particular piece of text simply by nesting them properly, for instance:

`<CENTER><B>This text is centred and in boldface</B></CENTER>`

Two of the most common mistakes when tagging text are:

- Getting the nesting wrong: `<B><CENTER>This should be centred boldface, but the tags are wrongly nested</B></CENTER>`

- Forgetting a tag: `<B><CENTER>This should be centred boldface, but there is a missing tag</CENTER>`

Write a program to check that all the tags in a given piece of text (a paragraph) are correctly nested, and that there are no missing or extra tags. An opening tag for this problem is enclosed by angle brackets, and contains exactly one upper case letter, for example `<T>`, `<X>`, `<S>`. The corresponding closing tag will be the same letter preceded by the symbol /; for the examples above these would be `</T>`, `</X>`, `</S>`.

If the paragraph is correctly tagged then output the line “Correctly tagged paragraph”, otherwise output a line of the form `Expected <expected> found <unexpected>` where `<expected>` is the closing tag matching the most recent unmatched tag and `<unexpected>` is the closing tag encountered. If either of these is the end of paragraph, i.e. there is either an unmatched opening tag or no matching closing tag at the end of the paragraph, then replace the tag or closing tag with `#`. These points are illustrated in the examples below which should be followed exactly as far as spacing is concerned.

## Sample Input

```
- The following text<C><B>is centred and in boldface</B></C>
- <B>This <\g>is <B>boldface</B> in <<*> a</B> <\6> <<d>sentence
- <B><C> This should be centred and in boldface, but the tags are wrongly nested </B></C>
- <B>This should be in boldface, but there is an extra closing tag</B></C>
- <B><C>This should be centred and in boldface, but there is a missing closing tag</C>
```

## Sample Output

```
- Correctly tagged paragraph
- Correctly tagged paragraph
- Expected </C> found </B>
- Expected # found </C>
- Expected </B> found #
```
