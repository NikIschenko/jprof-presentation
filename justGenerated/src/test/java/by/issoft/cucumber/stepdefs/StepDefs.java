package by.issoft.cucumber.stepdefs;

import by.issoft.JustGeneratedApp;

import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

import org.springframework.boot.test.context.SpringBootTest;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = JustGeneratedApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
