---
layout: default
---
<section id="hero">
	<div class="container">		
		<h1>Daniel Cooper</h1>
		<h2>Full-Stack Developer</h2>
		<h3>
		<i class="fa-solid fa-code" aria-hidden="true"></i>
		<i class="fa-solid fa-database" aria-hidden="true"></i>
		<i class="fa-solid fa-link" aria-hidden="true"></i>
		</h3>
	</div>
</section>
<section class="experience" id="roles">
	<div class="container">
		<h2>Experience</h2>
		<i class="fa-solid fa-chevron-up timeline-point" aria-hidden="true"></i>
		{% for role in site.data.experience %}
		<div class="role {{role.div_class}}">
			<h4>{{role.title}}</h4>
			{% for field in role.fields %}
			<p>{{field}}</p>
			{% endfor %}
			<ul class="tags">
			{% for tag in role.tags %}
				<li>{{tag}}</li>
			{% endfor %}
			</ul>
		</div>
		{% endfor %}
		<i class="fa-solid fa-circle-notch timeline-point timeline-bottom" aria-hidden="true"></i>
	</div>
</section>
<section class="off portfolio" id="projects">
	<h2>Projects</h2>
	{% for proj in site.data.projects %}
		{% capture content %} 
			<div class="column half">
				<p>{{proj.content}}</p>
			</div>{% endcapture %}
		{% capture media %}<div class="column half">
				<p>{{proj.media}}</p>
			</div> {% endcapture %}
		{% capture first %}{% cycle content, media %}{% endcapture %}
		{% capture second %}{% cycle media, content %}{% endcapture %}
		<div class="project container">
			<h4><i class="fa {{proj.icon}}" aria-hidden="true"></i>&nbsp; {{proj.title}}</h4>
			<ul class="tags">
			{% for tag in proj.tags %}
				<li>{{tag}}</li>
			{% endfor %}
			</ul>
			{{first}}
			{{second}}
		</div>
	{% endfor %}
</section>