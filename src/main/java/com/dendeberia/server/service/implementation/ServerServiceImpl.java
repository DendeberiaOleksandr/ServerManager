package com.dendeberia.server.service.implementation;

import com.dendeberia.server.config.ApplicationConfigurationProperties;
import com.dendeberia.server.model.Server;
import com.dendeberia.server.repository.ServerRepository;
import com.dendeberia.server.service.ServerService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.InetAddress;
import java.net.URISyntaxException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Random;

import static com.dendeberia.server.enumeration.Status.SERVER_DOWN;
import static com.dendeberia.server.enumeration.Status.SERVER_UP;

@Service
@Transactional
@Slf4j
public class ServerServiceImpl implements ServerService {

    private final ServerRepository serverRepository;
    private final ApplicationConfigurationProperties applicationConfigurationProperties;

    @Autowired
    public ServerServiceImpl(ServerRepository serverRepository,
                             ApplicationConfigurationProperties applicationConfigurationProperties) {
        this.serverRepository = serverRepository;
        this.applicationConfigurationProperties = applicationConfigurationProperties;
    }

    @Override
    public Server create(Server server) {
        log.info("Saving server: {}", server.getName());
        server.setImageUrl(setServerImageUrl());
        return serverRepository.save(server);
    }

    @Override
    public Collection<Server> list(int limit) {
        log.info("Fetching all servers");
        return serverRepository.findAll(PageRequest.of(0, limit)).toList();
    }

    @Override
    public Server get(Long id) {
        log.info("Fetching server by id: {}", id);
        return serverRepository.findById(id).get();
    }

    @Override
    public Server update(Server server) {
        log.info("Updating server: {}", server.getName());
        return serverRepository.save(server);
    }

    @Override
    public Boolean delete(Long id) {
        log.info("Deleting server by id: {}", id);
        serverRepository.deleteById(id);
        return true;
    }

    @Override
    public Server ping(String ipAddress) throws IOException {
        log.info("Pinging server ip: {}", ipAddress);
        Server server = serverRepository.findByIpAddress(ipAddress);
        InetAddress inetAddress = InetAddress.getByName(ipAddress);
        server.setStatus(inetAddress.isReachable(10000) ? SERVER_UP : SERVER_DOWN);
        serverRepository.save(server);
        return server;
    }

    private String setServerImageUrl() {
        String[] imageNames = {
                "server1.png",
                "server2.png",
                "server3.png"
        };
        return ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("/img/" + imageNames[new Random().nextInt(imageNames.length)])
                .toUriString();
    }
}
