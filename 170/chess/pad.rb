text = /^(?!.*<li>.*<li>).*$/

p "<ul><li><li>
  <form action=\"/load/<%= file %>\" method=\"post\">
    <button type=\"submit\" value=\"Submit\">
      example.yaml
    </button><li></form></li>

</ul>".match(text)
