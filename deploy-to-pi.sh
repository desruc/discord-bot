docker stop xanathar-bot
docker container rm xanathar-bot
docker build --build-arg DISCORD_TOKEN=NzE5MDMwOTg1ODk4ODUyMzUy.Xt4EFg.WzhsLf8mR6oUwDdVnnixT17NHeY --build-arg MONGO_USER=desruc --build-arg MONGO_PASSWORD=pWzsuDd6sAYRJWth --build-arg MONGO_HOST=discord-bot-l6hao --build-arg MONGO_DB=xanathar -t jamescameron91/discord-bot:latest ./
docker push jamescameron91/discord-bot:latest

# SSH into the pi - remove the old container/image then pull latest and start
# ssh pi@192.168.1.3 << EOF
#   docker stop xanathar-bot
#   docker container rm xanathar-bot
#   docker image rm jamescameron91/discord-bot:latest
#   docker container create --name xanathar-bot jamescameron91/discord-bot:latest
#   docker start xanathar-bot
# EOF