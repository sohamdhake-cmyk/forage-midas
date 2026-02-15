package com.jpmc.midascore.api;

import com.jpmc.midascore.service.SmartItrStore;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:4200", "http://127.0.0.1:4200"})
public class SmartItrController {

    private final SmartItrStore store;

    public SmartItrController(SmartItrStore store) {
        this.store = store;
    }

    @PostMapping("/auth/login")
    public SmartItrStore.UserProfile login(@RequestBody AuthRequest request) {
        String name = request.email() == null || request.email().isBlank()
                ? "Returning User"
                : request.email().split("@")[0];
        return store.updateUserProfile(new SmartItrStore.UserProfile(name, request.email()));
    }

    @PostMapping("/auth/register")
    public SmartItrStore.UserProfile register(@RequestBody RegisterRequest request) {
        return store.updateUserProfile(new SmartItrStore.UserProfile(request.fullName(), request.email()));
    }

    @GetMapping("/questionnaire")
    public SmartItrStore.QuestionnaireData getQuestionnaire() {
        return store.getQuestionnaireData();
    }

    @PutMapping("/questionnaire")
    public SmartItrStore.QuestionnaireData saveQuestionnaire(@RequestBody SmartItrStore.QuestionnaireData request) {
        return store.saveQuestionnaireData(request);
    }

    @GetMapping("/dashboard")
    public SmartItrStore.DashboardResponse getDashboard() {
        return store.getDashboard();
    }

    @GetMapping("/digilocker/documents")
    public List<SmartItrStore.DocumentState> getDocuments() {
        return store.getDocuments();
    }

    @PostMapping("/digilocker/documents/{name}/toggle")
    public List<SmartItrStore.DocumentState> toggleDocument(@PathVariable String name) {
        return store.toggleDocument(name);
    }

    @GetMapping("/summary")
    public SmartItrStore.SummaryResponse getSummary() {
        return store.getSummary();
    }

    public record AuthRequest(String email, String password) {
    }

    public record RegisterRequest(String fullName, String email, String password, String confirmPassword) {
    }
}
