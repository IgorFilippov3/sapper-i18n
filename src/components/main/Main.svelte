<script>
  import { stores } from "@sapper/app";

  const { session } = stores();

  const {
    hello,
    description,
  } = $session.locale;
</script>

<h1>{hello}</h1>
<p>{description}</p>