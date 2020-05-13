<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html><head>
  
  <meta content="text/html; charset=ISO-8859-1" http-equiv="content-type">
  <title></title>

  
</head><body>
<span style="font-family: Arial;"></span>
<h1>Configurazione del Firewall ASA 5506 rete DMZ e Rete Trust</h1>

<span style="font-family: Arial;">L'ASA 5506 è un dispositivo evoluto di
sicurezza che integra il firewall stateful, la VPN, il
dhcp,
varie tipologie di NAT e un router integrato. Il firewall protegge la
rete locale interna da attacchi esterni mentre consente l'accesso a
Internet da parte degli hosts interni. L'ASA 5506 crea interfaccie
con differenti livelli di sicurezza da 0 a 100. <br>
Le reti di default sono: Inside e Outside. Viene poi impostata una rete Dmz. <br>
Il traffico da un livello di sicurezza
più alto ad uno più basso è consentito mentre il traffico da un livello
di sicurezza più basso ad uno più alto non è permesso a meno che non si
tratta di un traffico di ritorno iniziato da host presenti su una rete
con un livello di sicurezza più alto (stateful packet inspection). <br>
<br>
Nello scenario è presente un router gestito da un&nbsp; ISP (Internet
Service Provider) e un firewall ASA 5506 a cui sono collegate una rete
Trust e una Dmz. </span><span style="font-family: Arial;">Gli
utenti esterni hanno un&nbsp; accesso
limitato alla DMZ per il server WEB e non dispongono di
alcun accesso alla rete interna. </span><br>
<span style="font-family: Arial;">
<br>
</span><img src="./immagini/scenario.jpg" alt=""><br>

<span style="font-weight: bold;"><span style="font-family: Arial;">Configurazione
del'interfaccia Inside:<br>
</span></span><span style="font-family: Arial;"><span style="font-family: Arial;"><br>
L'interfaccia Gig1/2 è configurata per la rete interna (inside) con un
livello di sicurezza pari a 100.</span><br>
</span><span style="font-weight: bold;"><span style="font-family: Arial;"><br>
</span></span>ASA-FIREWALL(config)#interface GigabitEthernet1/2
<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-if)#
nameif inside</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-if)#
security-level 100</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-if)# ip
address 192.168.1.1 255.255.255.0</p>

<br>

<span style="font-weight: bold;"><span style="font-family: Arial;">Configurazione
del'interfaccia Outside:<br>
</span></span><span style="font-family: Arial;"><span style="font-family: Arial;"><br>
L'interfaccia Gig1/1 è configurata per la rete esterna (outside) con un
livello di sicurezza pari a 0.</span></span><br>

<br>

ASA-FIREWALL(config)#interface GigabitEthernet1/1
<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-if)#&nbsp;
nameif outside
</p>

ASA-FIREWALL(config-if)#&nbsp; security-level 0
<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-if)# ip
address 9.0.0.1 255.0.0.0</p>

<br>

<p style="margin: 0px; text-indent: 0px;"><span style="font-weight: bold;"><br>
</span></p>

<p style="margin: 0px; text-indent: 0px; font-family: Arial;"><span style="font-weight: bold;"><span style="font-weight: bold;">Configurazione
della rotta di last resort sulla interfaccia outside</span></span></p>

<br>

<span style="font-family: Arial;">Impostazione della rotta verso il
gateway di last resort (router ISP)</span><br>

<p style="margin: 0px; text-indent: 0px;"><br>
<span style="font-weight: bold;"><span style="font-weight: bold;"></span></span></p>

ASA-FIREWALL(config)#route outside 0.0.0.0 0.0.0.0 9.0.0.2 <br>

<br>

<span style="font-weight: bold;"><span style="font-family: Arial;">Configurazione
del NAT-PAT (Auto-NAT) per la rete Trust</span><br>
<br>
<span style="font-family: Arial;"></span></span><span style="font-family: Arial;">Per la configurazione del NAT vengono
creati gli Object Network all'interno dei quali sono definite le regole
di traduzione<br>
degli indirizzi privati in pubblici e viceversa.<br>
<br>
</span>ASA-FIREWALL(config)#object network TRUST<br>

ASA-FIREWALL(config-network-object)#subnet 192.168.1.0 255.255.255.0<br>

ASA-FIREWALL(config-network-object)#nat (inside,outside) dynamic
interface<br>

<br>

<span style="font-weight: bold; font-family: Arial;">Impostazione del
Modular Policy Framework (MPF) per l'ispezione del traffico a livello
di applicazione</span><br>

<br>

<span style="font-family: Arial;">L'MPF utilizza tre oggetti: Class
maps (definisce i criteri), Policy maps (Associa le azioni ai criteri)
e <br>
Service policies (le policy map sono agganciate ad una interfaccia o
impostate in modo globale a tutte le interfaccie).<br>
La seguente configurazione della policy map consente anche il traffico
icmp e http:<br>
<br>
</span>ASA-FIREWALL(config)#class-map inspection_default
<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#
match default-inspection-traffic</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#policy-map
type inspect dns preset_dns_map <br>
</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#
parameters</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#
message-length maximum 512</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#policy-map
global_policy</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#
class inspection_default</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#
inspect dns preset_dns_map</p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap-c)#
inspect ftp </p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap-c)#
inspect http </p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap-c)#
inspect icmp </p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap-c)#
inspect tftp </p>

<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-cmap)#service-policy
global_policy global</p>

<br>

<span style="font-weight: bold;"><span style="font-family: Arial;"></span></span><span style="font-weight: bold; font-family: Arial;">Configurazione
del'interfaccia DMZ:<br>
</span><span style="font-family: Arial;"><span style="font-family: Arial;"><br>
L'interfaccia Gig1/3 è configurata per la rete dmz&nbsp; con un livello
di sicurezza pari a 70.</span></span><br>

<br>

ASA-FIREWALL(config)#interface GigabitEthernet1/3
<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-if)#&nbsp;
nameif dmz
</p>

ASA-FIREWALL(config-if)#&nbsp; security-level 70
<p style="margin: 0px; text-indent: 0px;">ASA-FIREWALL(config-if)# ip
address 192.168.2.1 255.255.255.0</p>

<br>

<span style="font-weight: bold;"></span><span style="font-weight: bold;"><span style="font-family: Arial;">Configurazione del static NAT per il server
nella DMZ con un network object</span><br>
</span><br>

<span style="font-family: Arial;"><span style="font-family: Arial;">L'object
Network specifica che l'indirizzo del server nella DMZ è tradotto con
l'indirizzo pubblico 9.0.0.10</span></span><br>

<br>

ASA-FIREWALL(config)#object network DMZ<br>

ASA-FIREWALL(config-network-object)#host 192.168.2.3<br>

ASA-FIREWALL(config-network-object)#nat (dmz,outside) static 9.0.0.10<br>

<br>

<span style="font-weight: bold;"><span style="font-family: Arial;">Configurazione
dell' Access List (ACL) per il traffico da Internet verso la DMZ:<br>
<br>
</span></span><span style="font-family: Arial;"><span style="font-family: Arial;">L'access list ACLDMZ permette il il
traffico IP da hosts esterni al server interno alla DMZ. L' acl è
applicata<br>
all'interfaccia esterna outside in ingresso<br>
<br>
</span></span>ASA-FIREWALL(config)#access-list ACLDMZ extended permit
ip any host 192.168.2.3<br>

ASA-FIREWALL(config)#access-group ACLDMZ in interface outside<br>

<br>

<span style="font-weight: bold;"><span style="font-family: Arial;">Impostazione
dell'intera configurazione sull'ASA 5506 utilizzando il file
startup-config<br>
<br>
</span></span><span style="font-family: Arial;">Da Config -&gt; Bottone
Load di Startup Config&nbsp; -&gt; selezionare il file startup-config e
ricaricare il sistema:<br>
<br>
</span>ASA-FIREWALL#reload<br>

<span style="font-family: Arial;"><br>
</span><span style="font-weight: bold;"><span style="font-family: Arial;"><br>
</span></span><img src="./immagini/config.jpg" alt=""><br>

<p style="margin: 0px; text-indent: 0px;"><br>
</p>

<br>

<br>

<br>

<br>

</body></html>